import styled from 'styled-components';
import StyledCard from '@/components/Card/StyledCard';
import { Link } from 'react-router-dom';
import { BlogPost, DisplayBlogPost, Group } from '@/types/blog';
import { useFilter } from '@/context/FilterContext';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/api/api.config';
import { formatDate } from '@/utils/fomatDate';
import { Loading } from '@/components/Loading';
import { Error } from '@/components/Error';
import { useTranslation } from 'react-i18next';
import { sanitizeObject } from '@/utils/security';

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Section = styled.section`
  margin-top: -30px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SectionTitle = styled.h2`
  padding-top: 15px;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const BlogContainer = styled.div`
  width: 100%;
`;

const BlogGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  max-width: 100%;
`;

const BlogTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const BlogSubtitle = styled.h4`
  font-size: 1rem;
  margin: 0;
  margin-top: 0.5rem;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const BlogDate = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => (theme.mode === 'dark' ? 'rgb(138, 138, 138)' : 'rgb(154, 154, 154) ')};
  margin-bottom: 0.8rem;
  font-weight: 500;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0.25rem 0.8rem;
  font-size: 0.6rem;
  border-radius: 12px;
  background-color: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : 'rgb(235, 235, 235)')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#000000')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  border-left: 3px solid ${({ theme }) => (theme.mode === 'dark' ? '#3498db' : '#3498db')};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    background-color: ${({ theme }) => (theme.mode === 'dark' ? '#383838' : 'rgb(245, 245, 245)')};
  }
`;

const StyledLink = styled(Link)`
  cursor: inherit;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

const TopicSelect = styled.select`
  padding: 0.5rem 0.7rem;
  border-radius: 13px;
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#444' : '#e5e5e5')};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#fff')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#000')};
  font-size: 0.8rem;
  font-weight: 400;
  cursor: pointer;
  width: 200px;
  appearance: none;
  padding-right: 2.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  padding-bottom: 1.2rem;
  margin-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#444' : '#e5e5e5')};
`;

const SortContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const SortButton = styled.button<{ active: boolean }>`
  padding: 0.4rem 0.6rem;
  border: none;
  background-color: ${({ active, theme }) =>
    active ? (theme.mode === 'dark' ? '#3a3a3a' : '#e5e5e5') : 'transparent'};
  border-radius: 6px;
  cursor: pointer;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#000')};
  font-size: 0.8rem;

  &:hover {
    background-color: ${({ theme }) => (theme.mode === 'dark' ? '#3a3a3a' : '#e5e5e5')};
  }
`;

const SelectWrapper = styled.div`
  position: relative;

  &::after {
    content: '▼';
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 0.7rem;
    color: ${({ theme }) => (theme.mode === 'dark' ? '#888' : '#666')};
  }
`;

const getIconForTag = (tag: string): string => {
  const iconMap: Record<string, string> = {
    Frontend: '🎨',
    Backend: '⚙️',
    Web_Dev: '🌐',
    React: '⚛️',
    JavaScript: '📜',
    TypeScript: '⚒',
    Node: '🟢',
  };

  return iconMap[tag] || '📄';
};

export default function Blog() {
  const { data, loading, error } = useFetch<BlogPost>(
    `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.BLOG.GET_ALL}`
  );
  const { selectedTag, setSelectedTag, selectedGroup, setSelectedGroup } = useFilter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [blogsArray, setBlogsArray] = useState<DisplayBlogPost[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { t } = useTranslation('blog');

  useEffect(() => {
    if (data) {
      // we sanitize the data to security reasons
      const sanitizedData = sanitizeObject(data) as unknown;

      // method to extract the blogs from the data
      const extractBlogsFromData = (data: unknown): DisplayBlogPost[] => {
        const blogs: DisplayBlogPost[] = [];

        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (isValidBlogItem(item)) {
              blogs.push(normalizeBlogItem(item));
            }
          });
        } else if (data && typeof data === 'object' && data !== null) {
          // we check whether if it is a direct map of blog posts
          const objectData = data as Record<string, unknown>;

          // buyerda objectData ni ichidagi har bir itemni tekshiramiz
          Object.values(objectData).forEach((item) => {
            if (isValidBlogItem(item)) {
              blogs.push(normalizeBlogItem(item));
            }
          });

          // agar blogs array bosh bolsa va objectData ichida faqatgina bir item bo'lsa
          if (blogs.length === 0 && Object.keys(objectData).length === 1) {
            const firstValue = Object.values(objectData)[0];
            if (firstValue && typeof firstValue === 'object' && firstValue !== null) {
              Object.values(firstValue as Record<string, unknown>).forEach((item) => {
                if (isValidBlogItem(item)) {
                  blogs.push(normalizeBlogItem(item));
                }
              });
            }
          }
        }

        return blogs;
      };

      // buyerda blog itemni tekshiramiz
      const isValidBlogItem = (item: unknown): boolean => {
        if (!item || typeof item !== 'object') return false;

        const blogItem = item as Record<string, any>;
        if (blogItem.id === undefined) return false;

        return !!(
          blogItem.title ||
          blogItem.subtitle ||
          blogItem.dataStructures ||
          blogItem.date ||
          blogItem.createdAt
        );
      };

      const normalizeBlogItem = (item: unknown): DisplayBlogPost => {
        const blogItem = item as Record<string, any>;

        let topic: string = '';
        let authorName: string = 'Sardor-M';
        let authorBio: string = '';

        if (blogItem.metadata && blogItem.metadata?.topic) {
          topic = blogItem.metadata.topic;
        }
        if (blogItem.metadata && blogItem.metadata.author) {
          authorName = blogItem.metadata.author.name;
          authorBio = blogItem.metadata.author.bio;
        }

        const normalizedMetadata = {
          author: {
            name: authorName,
            bio: authorBio,
          },
          topic: topic,
        };

        return {
          id: String(blogItem.id),
          title: blogItem.title || '',
          subtitle: blogItem.subtitle || '',
          date: blogItem.date || blogItem.createdAt || '',
          topic: topic,
          introduction: blogItem.introduction || '',
          dataStructures: blogItem.dataStructures || [],
          metadata: normalizedMetadata,
          readTime: blogItem.readTime || '5 min read',
        };
      };

      const extractedBlogs = extractBlogsFromData(sanitizedData);

      setBlogsArray(extractedBlogs);
      // console.log('Final blogsArray:', extractedBlogs);
    }
  }, [data]);

  useEffect(() => {
    if (blogsArray.length > 0) {
      // hamma topiclarni bir arrayga joylashtiramiz
      const allTags = blogsArray.flatMap((post) => post.topic);

      // occurenceni hisoblaymiz
      const tagCounts = allTags.reduce(
        (acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      const newGroups: Group[] = [
        {
          name: 'All',
          count: blogsArray.length,
          icon: '📑',
        },
        ...Object.entries(tagCounts).map(([tag, count]) => ({
          name: tag,
          count,
          icon: getIconForTag(tag),
        })),
      ];

      setGroups(newGroups);
    }
  }, [blogsArray]);

  const filteredPosts = blogsArray.filter((post) => {
    const matchedTag = selectedTag ? post.topic.includes(selectedTag) : true;
    const matchedGroup = selectedGroup === 'All' ? true : post.topic.includes(selectedGroup);
    return matchedTag && matchedGroup;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date || a.createdAt || '').getTime();
    const dateB = new Date(b.date || b.createdAt || '').getTime();

    return sortOrder === 'desc' ? dateA - dateB : dateB - dateA;
  });

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGroup(value === 'All' ? 'All' : value);
    setSelectedTag(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <Container>
      <Section>
        <SectionTitle>{t('blog.title')}</SectionTitle>
        <FilterContainer>
          <SelectWrapper>
            <TopicSelect value={selectedGroup} onChange={handleTopicChange}>
              <option value="All">{t('blog.title')}</option>
              {groups
                .filter((group) => group.name !== 'All')
                .map((group) => (
                  <option key={group.name} value={group.name}>
                    {group.icon} {group.name} ({group.count})
                  </option>
                ))}
            </TopicSelect>
          </SelectWrapper>
          <SortContainer>
            <SortButton active={sortOrder === 'desc'} onClick={() => setSortOrder('desc')}>
              Decs
            </SortButton>
            <SortButton active={sortOrder === 'asc'} onClick={() => setSortOrder('asc')}>
              Asc
            </SortButton>
          </SortContainer>
        </FilterContainer>
        <BlogContainer>
          <BlogGrid>
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post) => (
                <StyledLink key={`blog-${post.id}`} to={`/${post.id}`} state={{ blogData: post }}>
                  <StyledCard
                    style={{
                      variant: 'light',
                      padding: 'sm',
                      hoverable: true,
                    }}
                  >
                    <BlogTitle>{post.title}</BlogTitle>
                    <BlogDate>{formatDate(post.date)}</BlogDate>
                    <BlogSubtitle>{post.subtitle}</BlogSubtitle>
                    <TagList>
                      <Tag key={`blog-${post.id}-topic`}>{post.metadata?.topic}</Tag>
                    </TagList>
                  </StyledCard>
                </StyledLink>
              ))
            ) : (
              <div>No blog posts found. Try adjusting your filters.</div>
            )}
          </BlogGrid>
        </BlogContainer>
      </Section>
    </Container>
  );
}

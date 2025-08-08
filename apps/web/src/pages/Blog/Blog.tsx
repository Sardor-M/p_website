import { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledCard from '@/components/Card/StyledCard';
import { Link } from 'react-router-dom';
import { useFilter } from '@/context/FilterContext';
import { formatDate } from '@/utils/fomatDate';
import Loading from '@/components/Loading';
import { Error } from '@/components/Error';
import { useTranslation } from 'react-i18next';
import { getPosts, NotionPost } from '@/api/notion-client/index';
import { themeColor } from '@/themes/color';

type Group = {
  name: string;
  count: number;
  icon: string;
};

const Container = styled.div`
  min-height: 100vh;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${themeColor.breakpoints.mobile} {
    margin-top: 1rem;
    padding: 0;
    gap: 1rem;
    min-height: auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${themeColor.breakpoints.mobile} {
    margin-top: 0;
  }
`;

const SectionTitle = styled.h2`
  padding-top: 15px;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;

  ${themeColor.breakpoints.mobile} {
    font-size: 1.25rem;
    padding-top: 0;
    margin-bottom: 1rem;
  }
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

  ${themeColor.breakpoints.mobile} {
    gap: 0.8rem;
  }
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
  color: ${({ theme }) => (theme.mode === 'dark' ? 'rgb(138, 138, 138)' : 'rgb(154, 154, 154)')};
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
  border-radius: 6px;
  background-color: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : 'rgb(235, 235, 235)')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#000000')};
  border: 0.5px solid ${({ theme }) => (theme.mode === 'dark' ? '#444' : '#e5e5e5')};
  transition: all 0.2s ease;
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
  border-radius: 12px;
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#444' : '#e5e5e5')};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#fff')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#000')};
  font-size: 0.8rem;
  font-weight: 400;
  cursor: pointer;
  width: 200px;
  appearance: none;
  padding-right: 2.5rem;

  ${themeColor.breakpoints.mobile} {
    width: 150px;
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
    padding-right: 2rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  padding-bottom: 1.2rem;
  margin-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#444' : '#e5e5e5')};

  ${themeColor.breakpoints.mobile} {
    margin: 1rem 0;
    padding-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
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
  border-radius: 12px;
  cursor: pointer;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#000')};
  font-size: 0.8rem;

  &:hover {
    background-color: ${({ theme }) => (theme.mode === 'dark' ? '#3a3a3a' : '#e5e5e5')};
  }

  ${themeColor.breakpoints.mobile} {
    padding: 0.35rem 0.5rem;
    font-size: 0.75rem;
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

  ${themeColor.breakpoints.mobile} {
    &::after {
      right: 0.75rem;
      font-size: 0.6rem;
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#888' : '#666')};
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
    JSON: '📊',
    JSONB: '🗄️',
    PostgreSQL: '🐘',
    Database: '💾',
    API: '🔌',
    Tutorial: '📚',
    Guide: '📖',
  };

  return iconMap[tag] || '📄';
};

export default function Blog() {
  const [blogs, setBlogs] = useState<NotionPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ message: string } | null>(null);
  const { selectedTag, setSelectedTag, selectedGroup, setSelectedGroup } = useFilter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { t } = useTranslation('blog');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const posts = await getPosts();
        setBlogs(posts);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      const allTags = blogs.flatMap((post) => post.topic);

      const tagCounts = allTags.reduce<Record<string, number>>((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {});

      const newGroups: Group[] = [
        {
          name: 'All',
          count: blogs.length,
          icon: '📑',
        },
        ...Object.entries(tagCounts)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .map(([tag, count]) => ({
            name: tag,
            count,
            icon: getIconForTag(tag),
          })),
      ];

      setGroups(newGroups);
    }
  }, [blogs]);

  const filteredPosts = blogs.filter((post) => {
    const matchedTag = selectedTag ? post.topic.includes(selectedTag) : true;
    const matchedGroup = selectedGroup === 'All' ? true : post.topic.includes(selectedGroup);
    return matchedTag && matchedGroup;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGroup(value === 'All' ? 'All' : value);
    setSelectedTag(null);
  };

  if (loading) {
    return (
      <Container style={{ position: 'relative', minHeight: 'calc(100vh - 80px)' }}>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Error message={`Failed to load blogs: ${error.message}`} />
      </Container>
    );
  }

  return (
    <Container>
      <Section>
        <SectionTitle>{t('blog.title', 'My Blogs')}</SectionTitle>
        <FilterContainer>
          <SelectWrapper>
            <TopicSelect value={selectedGroup} onChange={handleTopicChange}>
              <option value="All">{t('blog.all', 'All Posts')}</option>
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
              Latest
            </SortButton>
            <SortButton active={sortOrder === 'asc'} onClick={() => setSortOrder('asc')}>
              Oldest
            </SortButton>
          </SortContainer>
        </FilterContainer>
        <BlogContainer>
          <BlogGrid>
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post) => (
                <StyledLink
                  key={`blog-${post.id}`}
                  to={`/blog/${post.slug}`}
                  state={{ blogId: post.id }}
                >
                  <StyledCard
                    style={{
                      variant: 'light',
                      padding: 'sm',
                      hoverable: true,
                    }}
                  >
                    <BlogTitle>{post.title}</BlogTitle>
                    <BlogDate>{formatDate(post.date)}</BlogDate>
                    <BlogSubtitle>{post.subtitle || post.introduction}</BlogSubtitle>
                    <TagList>
                      {post.topic.map((tag, index) => (
                        <Tag key={`${post.id}-tag-${index}`}>
                          {getIconForTag(tag)} {tag}
                        </Tag>
                      ))}
                    </TagList>
                  </StyledCard>
                </StyledLink>
              ))
            ) : (
              <EmptyState>
                {groups.length > 1
                  ? 'No blog posts found. Try adjusting your filters.'
                  : 'No blog posts available yet.'}
              </EmptyState>
            )}
          </BlogGrid>
        </BlogContainer>
      </Section>
    </Container>
  );
}

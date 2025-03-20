import styled from 'styled-components';
import StyledCard from '@/components/Card/StyledCard';
import { Link } from 'react-router-dom';
import {
  BlogContent,
  BlogPost,
  BlogResponse,
  DisplayBlogPost,
  FirebaseBlogContent,
  Group,
} from '@/types/blog';
import { themeColor } from '@/themes/color';
import { useFilter } from '@/context/FilterContext';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/api/api.config';
import { formatDate } from '@/utils/fomatDate';
import { Loading } from '@/components/Loading';
import { Error } from '@/components/Error';
import { sanitizeObject } from '@/utils/security';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  // we hide the scrollbar for chrome and safari
  &::-webkit-scrollbar {
    display: none;
  }

  // other web browsers
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

const BlogDate = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => (theme.mode === 'dark' ? 'rgb(138, 138, 138)' : 'rgb(154, 154, 154) ')};
  margin-bottom: 0.8rem;
  font-weight: 500;
`;

const BlogDescription = styled.p`
  margin-top: 0.5rem;
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
`;

const StyledLink = styled(Link)`
  cursor: inherit;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

const BlogPostCard = styled(StyledCard)`
  color: ${(props) => props.theme.textColor};
`;

const GroupsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const GroupItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: 12px;
  border: none;
  background-color: ${({ active, theme }) =>
    active ? (theme.mode === 'dark' ? '#3a3a3a' : '#e5e5e5') : 'transparent'};
  color: ${({ theme }) => (theme.mode === 'dark' ? themeColor.text.dark : themeColor.text.light)};
  transition: all 0.2s;
  font-size: 0.8rem;

  &:hover {
    background-color: ${({ theme }) => (theme.mode === 'dark' ? '#3a3a3a' : '#e5e5e5')};
  }
`;

const GroupIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

const GroupCount = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => (theme.mode === 'dark' ? themeColor.text.dark : themeColor.text.light)};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? '#2d2d2d' : '#f0f0f0')};
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
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
  const { data, loading, error } = useFetch<BlogResponse>(
    `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.BLOG.GET_ALL}`
  );
  const { selectedTag, setSelectedTag, selectedGroup, setSelectedGroup } = useFilter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [blogsArray, setBlogsArray] = useState<DisplayBlogPost[]>([]);
  const { t } = useTranslation('blog');

  useEffect(() => {
    if (data) {
      console.log('Initial data:', data);

      // we sanitize the dat to secutiy reasons
      const sanitizedData = sanitizeObject(data) as unknown;
      console.log('After sanitize:', sanitizedData);

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

        const blogItem = item as Partial<BlogPost>;
        return !!(
          blogItem.id !== undefined &&
          blogItem.title &&
          blogItem.date &&
          (blogItem.topics || blogItem.tags)
        );
      };

      const normalizeBlogItem = (item: unknown): DisplayBlogPost => {
        const blogItem = item as Partial<BlogPost>;
        return {
          id: String(blogItem.id),
          title: blogItem.title || '',
          date: blogItem.date || '',
          topics: blogItem.topics || blogItem.tags || [],
          content: blogItem.content || [],
        };
      };

      const extractedBlogs = extractBlogsFromData(sanitizedData);

      setBlogsArray(extractedBlogs);
      console.log('Final blogsArray:', extractedBlogs);
    }
  }, [data]);

  useEffect(() => {
    if (blogsArray.length > 0) {
      // hamma topiclarni bir arrayga joylashtiramiz
      const allTags = blogsArray.flatMap((post) => post.topics);

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

  // filter qilamiz
  const filteredPosts = blogsArray.filter((post) => {
    const matchedTag = selectedTag ? post.topics.includes(selectedTag) : true;
    const matchedGroup = selectedGroup === 'All' ? true : post.topics.includes(selectedGroup);
    return matchedTag && matchedGroup;
  });

  const handleGroupClick = (group: string) => {
    if (group === selectedGroup) {
      setSelectedGroup('All');
    } else {
      setSelectedGroup(group);
    }

    setSelectedTag(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  function isFirebaseBlogContent(
    content: BlogContent[] | FirebaseBlogContent
  ): content is FirebaseBlogContent {
    return !Array.isArray(content) && content && typeof content === 'object' && 'html' in content;
  }

  return (
    <Container>
      <Section>
        <SectionTitle>{t('blog.title')}</SectionTitle>
        <GroupsContainer>
          {groups.map((group) => (
            <GroupItem
              key={group.name}
              active={selectedGroup === group.name}
              onClick={() => handleGroupClick(group.name)}
            >
              <GroupIcon>{group.icon}</GroupIcon> {group.name}
              <GroupCount>{group.count}</GroupCount>
            </GroupItem>
          ))}
        </GroupsContainer>
        <BlogContainer>
          <BlogGrid>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <StyledLink key={`blog-${post.id}`} to={`/${post.id}`} state={{ blogData: post }}>
                  <BlogPostCard variant="light" padding="sm" hoverable={true}>
                    <BlogTitle>{post.title}</BlogTitle>
                    <BlogDate>{formatDate(post.date)}</BlogDate>
                    <BlogDescription>
                      {Array.isArray(post.content) && post.content[0]?.text
                        ? post.content[0].text
                        : isFirebaseBlogContent(post.content) && post.content.html
                          ? post.content.html.substring(0, 200).replace(/<[^>]*>/g, '') + '...'
                          : 'No content'}
                    </BlogDescription>
                    <TagList>
                      {post.topics.map((tag, index) => (
                        <Tag
                          key={`${post.id}-${tag}-${index}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedTag(tag);
                            setSelectedGroup('All');
                          }}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </TagList>
                  </BlogPostCard>
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

// const GROUPS: Group[] = [
//   {
//     name: "All",
//     count: sample_fake_blogs.length,
//     icon: "📑",
//   },
//   {
//     name: "Frontend",
//     count: sample_fake_blogs.filter((post) => post.topics.includes("Frontend"))
//       .length,
//     icon: "🎨",
//   },
//   {
//     name: "Backend",
//     count: sample_fake_blogs.filter((post) => post.topics.includes("Backend"))
//       .length,
//     icon: "⚙️",
//   },
//   {
//     name: "Web Development",
//     count: sample_fake_blogs.filter((post) =>
//       post.topics.includes("Web Development")
//     ).length,
//     icon: "🌐",
//   },
// ];

import { BlogPost } from '@/types/blog';
import styled from 'styled-components';

type Props = {
  posts: BlogPost[];
  selectedTag: string | null;
};

export const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BlogCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Tag = styled.span`
  background: #ececec;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  margin-right: 5px;
`;

export default function BlogList({ posts, selectedTag }: Props) {
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.metadata.topic === selectedTag)
    : posts;

  return (
    <BlogContainer>
      {filteredPosts.map((post) => (
        <BlogCard key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.date}</p>
          <Tag>{post.metadata.topic}</Tag>
        </BlogCard>
      ))}
    </BlogContainer>
  );
}

import React from 'react';
import { BlogContainer, BlogCard, Tag } from './BlogListStyles';
import { BlogPost } from '@/types/blog';


type Props = {
  posts: BlogPost[];
  selectedTag: string | null;
};

const BlogList: React.FC<Props> = ({ posts, selectedTag }) => {
  const filteredPosts = selectedTag 
    ? posts.filter((post) => post.metadata.topics.includes(selectedTag))
    : posts;

  return (
    <BlogContainer>
      {filteredPosts.map((post) => (
        <BlogCard key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.date}</p>
          {post.metadata.topics.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </BlogCard>
      ))}
    </BlogContainer>
  );
};

export default BlogList;

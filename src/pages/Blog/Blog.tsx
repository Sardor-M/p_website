import styled from 'styled-components';

const BlogContainer = styled.div`
  padding: 2rem;
`;

const Post = styled.div`
  margin-bottom: 2rem;
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const PostDate = styled.p`
  font-size: 0.875rem;
  color: #888;
`;

const PostContent = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

function Blog() {
  return (
    <BlogContainer>
      <h1>Blog</h1>
      <Post>
        <PostTitle>Understanding React Hooks</PostTitle>
        <PostDate>January 1, 2025</PostDate>
        <PostContent>
          React Hooks are functions that let you use state and other React features without writing a class. They were introduced in React 16.8. Hooks allow you to reuse stateful logic without changing your component hierarchy.
        </PostContent>
      </Post>
      <Post>
        <PostTitle>Node.js Best Practices</PostTitle>
        <PostDate>February 1, 2025</PostDate>
        <PostContent>
          Node.js is a powerful tool for building server-side applications. Following best practices can help you write more efficient and maintainable code. This includes using asynchronous programming, handling errors properly, and optimizing performance.
          Node.js is a powerful tool for building server-side applications. Following best practices can help you write more efficient and maintainable code. This includes using asynchronous programming, handling errors properly, and optimizing performance.
          Node.js is a powerful tool for building server-side applications. Following best practices can help you write more efficient and maintainable code. This includes using asynchronous programming, handling errors properly, and optimizing performance.
          Node.js is a powerful tool for building server-side applications. Following best practices can help you write more efficient and maintainable code. This includes using asynchronous programming, handling errors properly, and optimizing performance.
          Node.js is a powerful tool for building server-side applications. Following best practices can help you write more efficient and maintainable code. This includes using asynchronous programming, handling errors properly, and optimizing performance.
        </PostContent>
      </Post>
    </BlogContainer>
  );
}

export default Blog;
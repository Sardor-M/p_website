import styled from "styled-components";
import StyledCard from "../../components/Card/StyledCard";

const BlogContainer = styled.div`
  margin-top: -36px;
  padding: 2rem;
`;

const BlogTitle = styled.h2`
  padding-top: 15px;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Post = styled.div`
  margin-bottom: 2rem;
`;

const PostTitle = styled.h3`
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
      <BlogTitle>Blog</BlogTitle>
      <Post>
      <StyledCard key={"id"} variant="light" padding="sm" size="sm">
        <PostTitle>Node.js Best Practices</PostTitle>
        <PostDate>February 1, 2025</PostDate>
        <PostContent>
          Node.js is a powerful tool for building server-side applications.
          Following best practices can help you write more efficient and
          maintainable code. This includes using asynchronous programming,
          handling errors properly, and optimizing performance. Node.js is a
          powerful tool for building server-side applications. Following best
          practices can help you write more efficient and maintainable code.
          This includes using asynchronous programming, handling errors
          properly, and optimizing performance. Node.js is a powerful tool for
          building server-side applications. Following best practices can help
          you write more efficient and maintainable code. This includes using
          asynchronous programming, handling errors properly, and optimizing
          performance. Node.js is a powerful tool for building server-side
          applications. Following best practices can help you write more
          efficient and maintainable code. This includes using asynchronous
          programming, handling errors properly, and optimizing performance.
          Node.js is a powerful tool for building server-side applications.
          Following best practices can help you write more efficient and
          maintainable code. This includes using asynchronous programming,
          handling errors properly, and optimizing performance.
        </PostContent>
        </StyledCard>
      </Post>
    </BlogContainer>
  );
}

export default Blog;

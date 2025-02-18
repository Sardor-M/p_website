import { BlogPost } from "@/types/blog";

export const sample_fake_blogs: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      subtitle: "A comprehensive guide to React's most powerful feature",
      date: "2025-01-01",
      author: {
        name: "John Doe",
        image: "/api/placeholder/48/48",
        bio: "Senior Frontend Developer",
      },
      readTime: "5 min read",
      tags: ["React", "Frontend", "Web Development"],
      description:
        "Learn how to use React Hooks effectively in your applications",
      content: `
        <h2>Understanding React Hooks</h2>
        <p>Hooks are a powerful feature introduced in React 16.8 that allow you to use state and other React features in functional components.</p>
        <h3>Why Hooks?</h3>
        <p>Hooks solve many problems that developers faced with class components and lifecycle methods.</p>
      `,
    },
    {
      id: 2,
      title: "Node.js Best Practices for 2025",
      subtitle: "Optimize your Node.js applications for production",
      date: "2025-02-01",
      author: {
        name: "Jane Smith",
        image: "/api/placeholder/48/48",
        bio: "Backend Architecture Specialist",
      },
      readTime: "8 min read",
      tags: ["Node.js", "Backend", "Performance"],
      description:
        "Essential practices for building scalable Node.js applications",
      content: `
        <h2>Building Scalable Node.js Applications</h2>
        <p>Learn the essential practices for creating production-ready Node.js applications that can handle high traffic and complex operations.</p>
        <h3>Performance Optimization</h3>
        <p>Discover key strategies for optimizing your Node.js application's performance.</p>
      `,
    },
  ];
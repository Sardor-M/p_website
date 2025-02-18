export type BlogPost = {
    id: number;
    title: string;
    subtitle: string;
    date: string;
    author: {
      name: string;
      image: string;
      bio: string;
    };
    readTime: string;
    tags: string[];
    content: string;
    description: string;
  };
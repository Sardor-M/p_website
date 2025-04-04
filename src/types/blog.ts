export type BlogContentUtils = {
  getTitle: () => string;
  getSubtitle: () => string;
  getAuthorName: () => string;
  getTopics: () => string[];
  createPostForAuthorSection: () => BlogPost;
  renderContent: () => React.ReactNode;
}

export type BlogPost = {
  id?: string; 
  title?: string;
  subtitle?: string;
  date?: string;
  readTime?: string;
  introduction?: string;
  dataStructures?: DataStructure[];
  metadata:  AuthorData,
  createdAt?: string;
  updatedAt?: string;
};

export type DisplayBlogPost = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  topics: string[];
  introduction: string;
  dataStructures: DataStructure[];
  metadata: AuthorData,
  readTime: string;
};

export type AuthorData = {
  author: {
    name: string;
    bio?: string;
  };
  topics: string[];
};


export type Example = {
  description: string;
  command: string;
  language?: string;
  type?: string;
  returns?: string | string[];
  output?: string | null;
}

export type DataStructure = {
  name: string;
  description: string;
  points?: string;
  notes?: string;
  realWorldApplications?: string[];
  useCases?: string[];
  examples?: Example[];
  advantages?: string[];
  features?: string[];
  traditionalApproach?: string[];
  subSections?: DataStructure[];
};


export type ContentBlockProps = {
  item: {
    type: string;
    text?: string;
    level?: number;
    items?: any[];
    language?: string;
    url?: string;
    alt?: string;
  };
  postId: string | null;
  index: number;
};

export type Group = {
  name: string;
  count: number;
  icon?: string;
}

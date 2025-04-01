export type ListItem = 
  | string 
  | {
      text: string;
      items?: ListItem[];
    };

export interface FirebaseBlogContent {
  html: string;
  blocks?: any[];
  entityMap?: Record<string, any>;
}

export type BlogAuthor = {
  name: string;
  image: string;
  bio: string;
}

export type ContentBlockType = {
  type: string;
  text?: string;
  level?: number;
  items?: ListItem[]; 
  language?: string;
  url?: string;
  alt?: string;
  id?: string;
}

export type Post = {
  id: string;
  title: string;
  date: string;
  topics: string[];
  content: ContentBlockType[] | FirebaseBlogContent;
  subtitle?: string;
  _routeId?: string;
  _timestamp?: number;
  author: {
    name: string;
    image: string;
    bio?: string;
  };
  readTime: string;
}

export type DisplayBlogPost = {
  id: string;
  title: string;
  subtitle?:string;
  date: string;
  topics: string[];
  content: ContentBlockType[] | FirebaseBlogContent;
};

export type BlogPost = {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  author: BlogAuthor;
  readTime: string;
  topics: string[];
  content: ContentBlockType[] | FirebaseBlogContent;
  createdAt: string;
  updatedAt: string;
  description?: string;
  tags?: string[]
}

export type Group = {
  name: string;
  count: number;
  icon?: string;
}

export type FilterType = {
  selectedTag: string | null;
  selectedGroup: string | null;
};

export type BlogResponse = {
  data: BlogPost[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};

export type ContentBlockProps = {
  item: ContentBlockType;
  postId: string | null;
  index: number;
}
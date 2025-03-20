export interface BlogContent {
  type: 'heading' | 'paragraph' | 'code' | 'blackquote' | 'list' | 'image';
  text: string;
  level?: number;
  items?: string[];
  url?: string;
  alt?: string;
  id?: string;
}

export interface FirebaseBlogContent {
  html: string;
  blocks?: any[];
  entityMap?: Record<string, any>;
}

export interface BlogAuthor {
  name: string;
  image: string;
  bio: string;
}

export type Post = {
  id: string;
  title: string;
  date: string;
  topics: string[];
  content: BlogContent[] | FirebaseBlogContent;
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
  date: string;
  topics: string[];
  content: BlogContent[] | FirebaseBlogContent;
};

export interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  author: BlogAuthor;
  readTime: string;
  topics: string[];
  content: BlogContent[] | FirebaseBlogContent;
  createdAt: string;
  updatedAt: string;
  description?: string;
  tags?: string[]
}

export interface Group {
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


// export type ContentBlockItem = {
//   type: 'heading' | 'paragraph' | 'code' | 'blackquote' | 'list' | 'image';
//   text: string;
//   level?: number;
//   items?: string[];
//   url?: string;
//   alt?: string;
// }


// export type BlogProps = {
//   selectedTag: string | null;
//   setSelectedTag: (tag: string | null) => void;
//   selectedGroup: string;
//   setSelectedGroup: (group: string) => void;
// }

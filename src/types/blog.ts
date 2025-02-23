export interface BlogContent {
  type: string;
  text?: string;
  level?: number;
  language?: string;
  content?: string;
}

export interface BlogAuthor {
  name: string;
  image: string;
  bio: string;
}

export interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  author: BlogAuthor;
  readTime: string;
  topics: string[];
  content: BlogContent[];
  createdAt: string;
  updatedAt: string;
  description?: string;
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
  items: BlogPost[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};


export type ContentBlockItem = {
  type: 'heading' | 'paragraph' | 'code' | 'blackquote' | 'list' | 'image';
  text?: string;
  level?: number;
  items?: string[];
  url?: string;
  alt?: string;
}

// export type BlogProps = {
//   selectedTag: string | null;
//   setSelectedTag: (tag: string | null) => void;
//   selectedGroup: string;
//   setSelectedGroup: (group: string) => void;
// }

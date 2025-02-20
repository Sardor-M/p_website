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

  export interface Group {
    name: string;
    count: number;
    icon?: string; 
  }
  
  export type FilterType = {
    selectedTag: string | null;
    selectedGroup: string | null;
  }

  // export type BlogProps = {
  //   selectedTag: string | null;
  //   setSelectedTag: (tag: string | null) => void;
  //   selectedGroup: string;
  //   setSelectedGroup: (group: string) => void;
  // }
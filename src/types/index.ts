export type BlogPost = {
  id: number;
  title: string;
  date: string;
  tags: string[];
  category: string;
  description: string;
};

export type AppProps = {
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
};

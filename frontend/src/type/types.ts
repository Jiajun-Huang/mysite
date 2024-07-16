interface Tag {
  id?: number;
  name?: string;
  created_at?: string;
  updated_at?: string;
  deleted?: boolean;
}

interface Category {
  id?: number;
  name?: string;
  created_at?: string;
  updated_at?: string;
  deleted?: boolean;
}

interface Blog {
  id?: number;
  title?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  likes?: number;
  views?: number;
  deleted?: boolean;
  uri: string;
  files: string;
  category?: Category;
  tags?: Tag[];
}

interface User {
  id: number;
  username: string;

  [key: string]: any;
}

interface Comment {
  id: number;
  content: string;
  user: User;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  reply: number;
  root: number;

  replies?: Comment[];
}

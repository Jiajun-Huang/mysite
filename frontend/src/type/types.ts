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
  uri?: string;
  text_file?: string;
  category?: Category;
  tags?: Tag[];
}

interface User {
  id?: number;
  username?: string;
}

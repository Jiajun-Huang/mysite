import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Tag = {
  id?: number;
  name?: string;
  created_at?: string;
  updated_at?: string;
  deleted?: boolean;
};

export type Category = {
  id?: number;
  name?: string;
  created_at?: string;
  updated_at?: string;
  deleted?: boolean;
};

export type Blog = {
  id: number;
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
};

export type User = {
  id: number;
  username: string;

  [key: string]: any;
};

export type Comment = {
  id: number;
  content: string;
  user: User;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  reply: number; //
  root: number;

  replies?: Comment[];
};

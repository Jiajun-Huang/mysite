import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export const remarkPlugins = [remarkMath, remarkGfm];
export const rehypePlugins = [rehypeKatex, rehypeSlug];

import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
// import remarkCollapse from "remark-collapse";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkGithubAlerts from "remark-github-alerts";
import "remark-github-alerts/styles/github-base.css";
import "remark-github-alerts/styles/github-colors-dark-class.css";
import "remark-github-alerts/styles/github-colors-light.css";
import remarkMath from "remark-math";

import rehypeCodeType from "./rehype-code-type";

export const remarkPlugins = [remarkMath, remarkGfm, remarkGithubAlerts];
export const rehypePlugins = [
  rehypeKatex,
  rehypeSlug,
  rehypeStringify,
  rehypeRaw,
  rehypeCodeType,
  // rehypeMermaid,
];

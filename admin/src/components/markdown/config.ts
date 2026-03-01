import "katex/dist/katex.min.css";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkGithubAlerts from "remark-github-alerts";
import "remark-github-alerts/styles/github-base.css";
import "remark-github-alerts/styles/github-colors-dark-class.css";
import "remark-github-alerts/styles/github-colors-light.css";
import remarkMath from "remark-math";

// @ts-ignore
import rehypeCodeType from "./rehype-code-type.js";

export const remarkPlugins = [remarkMath, remarkGfm, remarkGithubAlerts];
export const rehypePlugins = [
  rehypeKatex,
  rehypeSlug,
  rehypeStringify,
  rehypeRaw,
  rehypeCodeType,
];

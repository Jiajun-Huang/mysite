import { visit } from "unist-util-visit";

/**
 * Rehype plugin to add block/inline type detection to code elements
 * Adds a 'block' property to code nodes to distinguish between inline and block code
 */
export default function rehypeCodeType() {
  return (tree) => {
    visit(tree, "element", function (node, index, parent) {
      if (node.tagName === "code") {
        const isBlockCode = parent?.tagName === "pre";
        node.block = isBlockCode;
      }
    });
  };
}

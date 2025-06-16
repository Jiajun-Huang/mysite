import { visit } from "unist-util-visit";

export default function rehypeCodeType() {
  return (tree) => {
    // console.log(tree);
    // if (!tree || typeof tree !== "object") {
    //   return;
    // }
    console.log("asdfasd");
    visit(tree, "element", function (node, index, parent) {
      if (node.tagName == "code") {
        if (node.tagName === "code") {
          const isBlockCode =
            parent?.type === "element" && parent.tagName === "pre";

          node.properties = node.properties || {};
          //   node.properties["data-code-type"] = isBlockCode ? "block" : "inline";
          node.block = isBlockCode;
        }
      }
    });
  };
}

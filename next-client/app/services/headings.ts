import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";

export function headingTree() {
  return (node: any, file: any) => {
    console.dir(file);
    file.data.headings = getHeadings(node);
  };
}

function getHeadings(root: any) {
  const nodes = {};
  const output: any = [];
  const indexMap = {};
  visit(root, "heading", (node) => {
    addID(node, nodes);
    transformNode(node, output, indexMap);
  });

  return output;
}

function transformNode(node: any, output: any, indexMap: any) {
  const transformedNode = {
    value: toString(node),
    depth: node.depth,
    data: node.data,
    children: [],
  };

  if (node.depth === 2) {
    output.push(transformedNode);
    indexMap[node.depth] = transformedNode;
  } else {
    const parent = indexMap[node.depth - 1];
    if (parent) {
      parent.children.push(transformedNode);
      indexMap[node.depth] = transformedNode;
    }
  }
}

/*
 * Add an "id" attribute to the heading elements based on their content
 */
function addID(node: any, nodes: any) {
  const id = node.children.map((c: any) => c.value).join("");
  nodes[id] = (nodes[id] || 0) + 1;
  node.data = node.data || {
    hProperties: {
      id: `${id}${nodes[id] > 1 ? ` ${nodes[id] - 1}` : ""}`
        .replace(/[^a-zA-Z\d\s-]/g, "")
        .split(" ")
        .join("-")
        .toLowerCase(),
    },
  };
}

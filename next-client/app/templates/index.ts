import { FrontMatterGeneric } from "../types/markdown";
import FeatureTemplate from "./files/feature";

export type MarkdownTemplate = {
  filename: string;
  frontMatter: FrontMatterGeneric;
  content: string;
};

const MarkdownTemplateList = {
  feature: FeatureTemplate,
};

export default MarkdownTemplateList;

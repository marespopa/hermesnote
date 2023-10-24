import { FrontMatterGeneric } from "@/app/types/markdown";
import FeatureTemplate from "./files/software-feature-task-template";
import MonthlyBudgetTemplate from "./files/budget-monthly-template";
import YearlyBudgetTemplate from "./files/budget-yearly-template";
import ToDoListTemplate from "./files/todo-list-template";
import ProjectManagementTemplate from "./files/project-management-template";
import SoftwareTaskTemplate from "./files/software-task-template";

export type MarkdownTemplate = {
  filename: string;
  frontMatter: FrontMatterGeneric;
  content: string;
};

const MarkdownTemplateList = [
  ToDoListTemplate,
  SoftwareTaskTemplate,
  FeatureTemplate,
  ProjectManagementTemplate,
  MonthlyBudgetTemplate,
  YearlyBudgetTemplate,
];

export default MarkdownTemplateList;

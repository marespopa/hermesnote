import { FrontMatterGeneric } from "@/app/types/markdown";
import MonthlyBudgetTemplate from "./files/budget-monthly-template";
import YearlyBudgetTemplate from "./files/budget-yearly-template";
import ToDoListTemplate from "./files/todo-list-template";
import ProjectManagementTemplate from "./files/project-management-template";
import SoftwareTaskTemplate from "./files/software-task-template";
import SASSTemplate from "./files/sass-template";

export type MarkdownTemplate = {
  filename: string;
  frontMatter: FrontMatterGeneric;
  content: string;
};

const MarkdownTemplateList = [
  ToDoListTemplate,
  SoftwareTaskTemplate,
  ProjectManagementTemplate,
  SASSTemplate,
  MonthlyBudgetTemplate,
  YearlyBudgetTemplate,
];

export default MarkdownTemplateList;

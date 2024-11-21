import { FrontMatterGeneric } from "@/app/types/markdown";
import ToDoListTemplate from "./files/todo-list-template";
import DashboardTemplate from "./files/dashboard";
import WeeklyJournalTemplate from "./files/weekly-journal";
import ProjectManagementTemplate from "./files/project-management-template";
import SoftwareTaskTemplate from "./files/software-task-template";
import SASSTemplate from "./files/sass-template";
import DailyStandupTemplate from "./files/daily-standup";
import MeetingNotesTemplate from "./files/meeting-notes";
import MonthlyBudgetTemplate from "./files/monthly-budget";

export type MarkdownTemplate = {
  filename: string;
  frontMatter: FrontMatterGeneric;
  content: string;
};

const MarkdownTemplateList = [
  ToDoListTemplate,
  DashboardTemplate,
  WeeklyJournalTemplate,
  DailyStandupTemplate,
  SoftwareTaskTemplate,
  MeetingNotesTemplate,
  MonthlyBudgetTemplate,
  ProjectManagementTemplate,
  SASSTemplate,
];

export default MarkdownTemplateList;

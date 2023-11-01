import { MarkdownTemplate } from "..";

const ToDoListTemplate: MarkdownTemplate = {
  filename: "todo-list",
  frontMatter: {
    title: "To Do List",
    description: `A simple checklist for tasks you need to complete.`,
    tags: "todo, list, productivity",
  },
  content: `
  # To-Do List ✏️
  
  Use this to-do list to keep track of tasks and stay organized.
  
  - ⬜Task 1
  - ⬜Task 2
  - ⬜Task 3
  - ⬜Task 4
  - ⬜Task 5
  - ⬜Task 6
  
  ## Priority Tasks 🎯
  
  - ⬜High Priority Task
  - ⬜Another High Priority Task
  
  ## Completed Tasks 💯
  
  - ✅Completed Task 1
  - ✅Completed Task 2
  
  ## Notes 📋
  
  Add any notes, reminders, or details about your tasks here.`,
};

export default ToDoListTemplate;

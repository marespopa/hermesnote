import { MarkdownTemplate } from "..";

const ExampleTemplate: MarkdownTemplate = {
  filename: "dashboard",
  frontMatter: {
    title: "Dashboard",
    description: `An organized template tailored to effectively manage tasks and projects.`,
    tags: "software,tasks,dashboard",
  },
  content: `# 🧠 Dashboard

## 🌅 Morning Routine
*Start your day intentionally.*
- Write down your top priorities for the day.
- Plan your tasks or schedule.
- (Optional) Check emails or messages briefly.

---

## ✅ Daily Tasks
*List the key tasks you want to complete today:*
- Task 1: [e.g., Finish report]
---

## 🎯 Weekly Goals
*Set your focus for the week.*
- Goal 1: [e.g., Complete project milestone]
---

## 🚀 Long-term Projects
*Break down big projects into smaller steps.*
- Project Name:
  - Step 1:
  - Step 2:

---

## 💡 Ideas & Improvements
*Capture any ideas or improvements you think of.*
- Idea 1: [e.g., Automate a repetitive task]
- Idea 2:

---

## 🌱 Personal Development
*Track activities that help you grow personally or professionally:*
- Activity 1: [e.g., Attend a workshop]
- Activity 2:

---

## 📝 Notes & Reflections (End of Day)
### Wins:
*What went well today?*
- Win 1

### Challenges:
*What was difficult or needs attention?*
- Challenge 1

### Next Steps:
*What do you plan to do next?*
- Step 1`
};

export default ExampleTemplate;

import { MarkdownTemplate } from "..";

const ExampleTemplate: MarkdownTemplate = {
  filename: "dashboard",
  frontMatter: {
    title: "Dashboard",
    description: `An organized template tailored for software engineers to effectively manage tasks and projects.`,
    tags: "software,tasks,dashboard",
  },
  content: `# 🧠 Dashboard

## 🌅 Morning Routine
- [ ] Review goals for today
- [ ] Check emails and messages
- [ ] Prioritize tasks for the day

---

## ✅ Daily Tasks
### Work
- [ ] Attend stand-up meeting
- [ ] Complete code review for [PR #123](#)
- [ ] Fix bugs in [Feature XYZ](#)
- [ ] Write documentation for [Project ABC](#)

### Quick Wins (Small tasks to finish quickly)
- [ ] Respond to pending emails
- [ ] Update ticket status in project board
- [ ] Sync with teammate on Task Y

---

## 🎯 Weekly Goals
### Learning & Development
- [ ] Complete [Online Course](#)
- [ ] Read [Book Title](#)

### Project Management
- [ ] Plan next sprint
- [ ] Update project roadmap

---

## 🚀 Long-term Projects
### Project A
- Phase 1: Research and Design  
  - [ ] Task1  
  - [ ] Task2  
- Phase 2: Implementation  
  - [ ] Task1  
  - [ ] Task2  
- Phase 3: Testing  
  - [ ] Task1  

### Project B
- Gather Requirements  
  - [ ] Task1  
  - [ ] Task2  
- Develop MVP  
  - [ ] Task1  

---

## 💡 Ideas & Improvements
*Capture ideas, insights, or improvements as they come to mind.*
- Explore new frameworks (e.g., React, Vue, Angular)
- Improve codebase structure
- Automate repetitive tasks in CI/CD pipeline

---

## 🌱 Personal Development
*Track activities that contribute to your growth.*
- [ ] Attend networking event
- [ ] Update resume and LinkedIn profile
- [ ] Write a blog post about recent learning

---

## 📝 Notes & Reflections (End of Day)
*Use this section to reflect on your day or jot down important notes.*
### Wins:
- Example: Finished code review for PR #123.
### Challenges:
- Example: Blocked by dependency issue in Feature XYZ.
### Next Steps:
- Example: Follow up with Product Manager on requirements for Project ABC.`
};

export default ExampleTemplate;

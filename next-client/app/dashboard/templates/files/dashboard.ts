import { MarkdownTemplate } from "..";

const ExampleTemplate: MarkdownTemplate = {
  filename: "dashboard",
  frontMatter: {
    title: "Dashboard",
    description: `An organized template tailored for software engineers to effectively manage tasks and projects.`,
    tags: "software,tasks,dashboard",
  },
  content: `# Dashboard 📝

## Daily Tasks
- [ ] **Morning Routine**
  - [ ] Review today's goals
  - [ ] Check emails and messages
- [ ] **Work Tasks**
  - [ ] Attend stand-up meeting
  - [ ] Complete code review for [PR #123](#)
  - [ ] Fix bugs in [Feature XYZ](#)
  - [ ] Write documentation for [Project ABC](#)

## Weekly Goals
- [ ] **Learning & Development**
  - [ ] Complete [Online Course](#)
  - [ ] Read [Book Title](#)
- [ ] **Project Management**
  - [ ] Plan next sprint
  - [ ] Update project roadmap

## Long-term Projects
- [ ] **Project A**
  - [ ] Phase 1: Research and Design
  - [ ] Phase 2: Implementation
  - [ ] Phase 3: Testing
- [ ] **Project B**
  - [ ] Gather requirements
  - [ ] Develop MVP

## Ideas & Improvements 💡
- [ ] Explore new frameworks (e.g., React, Vue, Angular)
- [ ] Improve codebase structure

## Personal Development
- [ ] Attend networking event
- [ ] Update resume and LinkedIn profile
`,
};

export default ExampleTemplate;

import { MarkdownTemplate } from "..";

const FeatureTemplate: MarkdownTemplate = {
  filename: "feature-template.md",
  frontMatter: {
    title: "Feature Development Checklist",
    description: `This checklist template is designed for software engineers and
                  developers to guide them through the professional feature development
                  process.`,
    tags: "software engineering,checklist,guide,template",
  },
  content: `# Software Engineer Task Checklist
  **Steps for Successful Task Completion**

  As a senior software engineer, following a structured approach is essential to ensure the successful completion of tasks.

  - [ ] **Task Summary:**
\`\`\`
Provide a brief summary of the current task.
\`\`\`

  - [ ] **Requirement Analysis:** 
\`\`\`
Thoroughly understand the task requirements and clarify any ambiguities. 
Ensure a comprehensive grasp of the task's goals and constraints.
\`\`\`

  - [ ] **Task Breakdown:** 
\`\`\`
Break the task into smaller, manageable sub-tasks or user stories. 
This helps in estimating and planning.
\`\`\`

  - [ ] **Design and Architecture:** 

\`\`\`
Create a high-level design or architectural plan. 
Consider how the task fits into the overall system.
\`\`\`

  - [ ] **Coding Standards:** 
\`\`\`
Follow coding standards and best practices applicable 
to the project and programming language.
\`\`\`

  - [ ] **Testing:** 
\`\`\`
Write unit tests for the code you're implementing. 
Ensure robust code and thorough test coverage.
\`\`\`

  - [ ] **Code Reviews:** 
\`\`\`
Collaborate with peers for code reviews. 
Address feedback and make necessary improvements.
\`\`\`

  - [ ] ** Testing:** 
\`\`\`
Verify that the task integrates seamlessly with the existing system, 
and solve any bugs that QA reports;
\`\`\`

  - [ ] **Documentation:** 
\`\`\`
Ensure comprehensive documentation, 
including user guides and code documentation.
\`\`\`

  - [ ] **Deployment:** 
\`\`\`
Deploy the task to a staging environment for final testing.
\`\`\`

 By following these steps, senior software engineers can ensure the successful completion of tasks, meeting project goals and delivering high-quality results.`,
};

export default FeatureTemplate;

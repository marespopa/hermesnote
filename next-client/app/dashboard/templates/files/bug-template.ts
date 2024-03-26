import { MarkdownTemplate } from "..";

const BugTemplate: MarkdownTemplate = {
  filename: "bug",
  frontMatter: {
    title: " Bug Title",
    description: `A bug report template that focuses on the essentials.`,
    tags: "bug,task,daily,engineering,software",
  },
  content: `# 🐞 Bug Title

  ## 🚨 Overview
  - **What's wrong?** Briefly describe the issue.
  
  ## 📍 Occurrence
  - **Where does it happen?** Specify the part(s) of the app affected.
  
  ## 🕵️ Steps to Reproduce
  1. First step
  2. Second step
  - **Frequency:** Always? Sometimes?
  
  ## 🎯 Expected vs. Actual
  - **Expected:** What should happen?
  - **Actual:** What actually happens?
  
  ## 📸 Attachments
  - **Screenshots/Videos:** [Link or attach]
  - **Logs:** [Link or attach]
  
  ## 🛠 Suggested Fix (If any)
  - **Your thoughts:** Brief idea on fixing it (optional).
  
  ## 🔗 Useful Links
  - [Related Docs](#)
  - [Similar Issues](#)`,
};

export default BugTemplate;

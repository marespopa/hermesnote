import { MarkdownTemplate } from "..";

const BugTemplate: MarkdownTemplate = {
  filename: "bug",
  frontMatter: {
    title: "Bug Task",
    description: `A bug report template that focuses on the essentials.`,
    tags: "bug,task,daily,engineering,software",
  },
  content: `# 🐞 [Bug-1] Bug Title

## Links 🖇️
| Type      | Link                 |
|-----------|----------------------|
| **Story** | [LinkTitle](LinkURL) |
| **Docs**  | [LinkTitle](LinkURL) |
| **PR**    | [LinkTitle](LinkURL) |

## 🚨 Description
- **What's wrong?** Briefly describe the issue.
- **Where does it happen?** Specify the part(s) of the app affected.

## 🕵️ Steps to Reproduce
1. First step
2. Second step

## 📸 Attachments
- **Screenshots/Videos:** [Link or attach]
- **Logs:** [Link or attach]

## 🛠 The Fix (If any)
- **Your thoughts:** Brief idea on fixing it (optional).`,
};

export default BugTemplate;

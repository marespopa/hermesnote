import { getDate } from "@/app/services/date-utils";
import { MarkdownTemplate } from "..";

const date = getDate();

const SoftwareTaskTemplate: MarkdownTemplate = {
  filename: "software-task.md",
  frontMatter: {
    title: "Software Task",
    description: `The Software Task Template streamlines software development task tracking, offering sections for task details, links, work description, progress updates, notes, and questions.`,
    tags: "software engineering,task,guide,template",
  },
  content: `
*as of [2023/10/25]*
# [Issue-3] Task Title

## Links
- [Story](link here)
- [Docs](link here)

## Description
Write details about the story implementation.

---
## Implementation

### Progress
- 2023/10/25
  - Implemented X feature.
- 2023/10/25
  - Started working on Y component.

### Questions
- Write here any uncertainty

### Notes
\`\`\` javascript
Add here any notes about the story, or you can even add code 
snippets in here:

const found = array1.find((element) => element > 10);
\`\`\`
`,
};

export default SoftwareTaskTemplate;

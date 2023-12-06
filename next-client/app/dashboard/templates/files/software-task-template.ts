import { getDate } from "@/app/services/date-utils";
import { MarkdownTemplate } from "..";

const date = getDate();

const SoftwareTaskTemplate: MarkdownTemplate = {
  filename: "task-1",
  frontMatter: {
    title: "Software Task",
    description: `The Software Task Template streamlines software development task tracking, offering sections for task details, links, work description, progress updates, notes, and questions.`,
    tags: "software engineering,task,guide,template",
  },
  content: `# [Task-1] Task Title

## Links 🖇️
| Type      | Link                 |
|-----------|----------------------|
| **Story** | [LinkTitle](LinkURL) |
| **Link**  | [LinkTitle](LinkURL) |
| **PR**    | [LinkTitle](LinkURL) |

## The problem 🤔
This is where things get interesting. The better you define the problem or the goal/feature you need to implement, and why you need to do it, the easier all the following steps will be.

- **Start with a high-level summary** - that way, readers can quickly decide if this is relevant to them or not and whether they should keep reading.
- **Provide some context** - explain a bit about the current state of the world, as it is right now. This can be a single sentence or a whole chapter, depending on the intended audience.
- **Clearly state the problem/goal** - explain why there is a problem and connect it with the user’s/company’s pain, so that motivation is clear.
- **Provide extra details if possible** - diagrams, code examples → anything that can help the reader get faster to that “aha” moment.

## Non-goals 🛑
This is the sub-section of the "Problem" that can sometimes be super valuable. Writing what we don't want or will not be doing in this codebase change can help set the expectations and better define its scope.

## Solution & Implementation 🛠️
Once we know what we want to do, we have to figure out the best way of doing it! You might have already hinted at the possible solution in the Problem section, but now is the moment to dive deeper - research different approaches, evaluate their pros and cons, and sketch how they could fit into the existing system.

## Remarks & open questions 🎯
In this final section of the document, you can summarize the main thoughts and highlight the biggest open questions. After going through everything, it can be helpful for the reader to be reminded of where his attention can be most valuable.  
`,
};

export default SoftwareTaskTemplate;

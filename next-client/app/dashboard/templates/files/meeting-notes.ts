import { MarkdownTemplate } from "..";

const MeetingNotesTemplate: MarkdownTemplate = {
  filename: "meeting-notes",
  frontMatter: {
    title: "Meeting Notes",
    description: `A structured template to document meeting agendas, discussions, and outcomes. 
Simplifies organizing and tracking action items for effective follow-ups.`,
    tags: "meeting,notes",
  },
  content: `# 🗓️ Meeting Notes

## 📅 Date: [Insert Date Here]
## 🕒 Time: [Insert Time Here]
## 🏢 Location: [Insert Location Here]
## 👥 Attendees:
- [Name 1]
- [Name 2]
- [Name 3]
- [Name 4]

## 📋 Agenda:
1. **[Agenda Item 1]**
   - Description: [Brief description of the agenda item]
   - Owner: [Person responsible for this item]
2. **[Agenda Item 2]**
   - Description: [Brief description of the agenda item]
   - Owner: [Person responsible for this item]
3. **[Agenda Item 3]**
   - Description: [Brief description of the agenda item]
   - Owner: [Person responsible for this item]

## 📝 Notes:
- **[Agenda Item 1]**
  - Key points discussed: [Summarize the key points]
  - Decisions made: [Record any decisions]
  - Action items: [Any follow-up tasks]
  
- **[Agenda Item 2]**
  - Key points discussed: [Summarize the key points]
  - Decisions made: [Record any decisions]
  - Action items: [Any follow-up tasks]
  
- **[Agenda Item 3]**
  - Key points discussed: [Summarize the key points]
  - Decisions made: [Record any decisions]
  - Action items: [Any follow-up tasks]

## ✅ Action Items:
1. **[Action Item 1]**
   - Owner: [Person responsible]
   - Deadline: [Due date]
   
2. **[Action Item 2]**
   - Owner: [Person responsible]
   - Deadline: [Due date]

## 📆 Next Meeting:
- **Date & Time:** [Next meeting date & time]
- **Location:** [Next meeting location]
- **Agenda:** [Preliminary agenda items]
`,
};

export default MeetingNotesTemplate;

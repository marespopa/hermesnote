import { FrontMatterGeneric } from "@/app/types/markdown";
import { MarkdownTemplate } from "..";

const FeatureTemplate: MarkdownTemplate = {
  filename: "FeatureTemplate",
  frontMatter: {
    title: "Feature Development Checklist",
    description: `This checklist template is designed for software engineers and
                  developers to guide them through the professional feature development
                  process. It provides a step-by-step checklist of essential tasks and
                   to ensure a successful feature from inception to delivery.
                   You can use it to track your progress, manage tasks, and stay
                  during your software development projects. The template also includes
                  an option for adding specific tasks and notes as needed.`,
    tags: "software engineering,checklist,guide,template",
  },
  content: `
  
# Professional Feature Development Checklist

Developing a software feature involves several steps to ensure it's completed professionally. Here's a checklist to help you take a feature from inception to delivery.

## Step 1: Requirement Analysis

- [ ] Understand the Requirements
- [ ] Clarify Ambiguities

## Step 2: Design and Planning

- [ ] Architectural Design
- [ ] Task Breakdown
- [ ] Planning

## Step 3: Implementation

- [ ] Follow Coding Standards
- [ ] Write Unit Tests
- [ ] Code Reviews
- [ ] Use Version Control

## Step 4: Testing

- [ ] Perform Unit Testing
- [ ] Conduct Integration Testing
- [ ] Regression Testing

## Step 5: Quality Assurance

- [ ] User Acceptance Testing (UAT)
- [ ] Performance Testing

## Step 6: Documentation

- [ ] Create User Documentation
- [ ] Document Code

## Step 7: Deployment

- [ ] Deploy to Staging Environment
- [ ] Deploy to Production

## Step 8: Monitoring

- [ ] Implement Monitoring Tools
- [ ] Collect Feedback

## Step 9: Post-Release Support

- [ ] Address Bug Fixes
- [ ] Plan Feature Improvements

### Task-specific Notes

- [ ] Task 1:
- [ ] Task 2:
- [ ] Task 3:

By using this checklist, you can keep track of the steps involved in professional feature development and add specific tasks as needed.
  `,
};

export default FeatureTemplate;

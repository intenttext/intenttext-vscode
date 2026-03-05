import * as vscode from "vscode";

const KEYWORD_DOCS: Record<
  string,
  { description: string; properties: string[] }
> = {
  title: {
    description: "Document title — rendered as the main heading.",
    properties: [],
  },
  summary: {
    description: "Brief document summary or abstract.",
    properties: [],
  },
  section: {
    description: "Major section heading — creates structure and enables TOC.",
    properties: [],
  },
  sub: {
    description: "Subsection heading — nested under the current section.",
    properties: [],
  },
  note: {
    description: "Informational callout box.",
    properties: [],
  },
  info: {
    description: "Info-level callout box.",
    properties: [],
  },
  warning: {
    description: "Warning callout — highlights important cautions.",
    properties: [],
  },
  tip: {
    description: "Tip callout — helpful suggestion or best practice.",
    properties: [],
  },
  success: {
    description: "Success callout — positive outcome or confirmation.",
    properties: [],
  },
  quote: {
    description: "Block quote — attributed text from a source.",
    properties: [],
  },
  image: {
    description: "Embed an image in the document.",
    properties: ["src", "alt", "caption", "width"],
  },
  link: {
    description: "External reference link.",
    properties: ["href", "title"],
  },
  ref: {
    description: "Internal cross-reference.",
    properties: [],
  },
  embed: {
    description: "Embed external content (iframe, video, audio).",
    properties: ["src", "type"],
  },
  code: {
    description:
      "Fenced code block — content goes on following lines until `end:`.",
    properties: ["language"],
  },
  headers: {
    description: "Define table column headers (pipe-separated values).",
    properties: [],
  },
  row: {
    description: "Table data row (pipe-separated values).",
    properties: [],
  },
  task: {
    description: "An action item for a human to complete.",
    properties: ["owner", "due", "priority", "status"],
  },
  done: {
    description: "A completed task (alias for task with done status).",
    properties: ["owner", "due"],
  },
  ask: {
    description: "A question directed at a person or team.",
    properties: ["to", "priority"],
  },
  step: {
    description: "Execute a tool or action in a workflow.",
    properties: ["tool", "input", "output", "depends", "id", "status", "timeout"],
  },
  decision: {
    description:
      "Conditional branch — evaluate a condition and route to different steps.",
    properties: ["if", "then", "else"],
  },
  trigger: {
    description: "Define an event trigger that starts a workflow step.",
    properties: ["event", "condition"],
  },
  loop: {
    description: "Iterate over a collection of items.",
    properties: ["over", "as", "max"],
  },
  checkpoint: {
    description: "Save workflow state for recovery.",
    properties: ["save"],
  },
  audit: {
    description: "Log an audit trail entry.",
    properties: [],
  },
  error: {
    description: "Declare an error handling path.",
    properties: [],
  },
  progress: {
    description: "Report progress of a long-running step.",
    properties: [],
  },
  context: {
    description: "Set key-value context data for the workflow.",
    properties: ["key", "value"],
  },
  result: {
    description: "Capture the final result of a workflow.",
    properties: ["depends"],
  },
  handoff: {
    description: "Transfer execution from one agent to another.",
    properties: ["from", "to"],
  },
  wait: {
    description: "Pause execution until a condition is met.",
    properties: ["for", "timeout"],
  },
  parallel: {
    description: "Execute multiple steps concurrently and wait for completion.",
    properties: ["steps", "join"],
  },
  retry: {
    description: "Retry a failed step with configurable backoff.",
    properties: ["max", "delay", "backoff"],
  },
  gate: {
    description: "Pause workflow for human approval before continuing.",
    properties: ["approver", "timeout", "fallback"],
  },
  call: {
    description: "Invoke a sub-workflow or external function.",
    properties: ["input", "output"],
  },
  emit: {
    description: "Emit an event or status update.",
    properties: [],
  },
  agent: {
    description: "Declare the AI agent executing this workflow.",
    properties: [],
  },
  model: {
    description: "Specify the AI model used by the agent.",
    properties: [],
  },
  font: {
    description: "Document typography settings.",
    properties: ["family", "size", "leading", "weight", "heading", "mono"],
  },
  page: {
    description: "Page layout settings for print output.",
    properties: [
      "size",
      "margins",
      "header",
      "footer",
      "columns",
      "numbering",
      "orientation",
    ],
  },
  byline: {
    description: "Author attribution for articles, reports, or books.",
    properties: ["date", "publication", "role"],
  },
  epigraph: {
    description: "Opening quotation or motto before the document body.",
    properties: [],
  },
  caption: {
    description: "Caption for images, tables, or figures.",
    properties: [],
  },
  footnote: {
    description: "A reference note. Use [^N] inline to reference it.",
    properties: ["text"],
  },
  toc: {
    description:
      "Auto-generated table of contents from section and sub headings.",
    properties: ["depth", "title"],
  },
  dedication: {
    description: "Book/report dedication page.",
    properties: [],
  },
  divider: {
    description: "Horizontal rule divider (written as `---`).",
    properties: [],
  },
};

export function createHoverProvider(): vscode.HoverProvider {
  return {
    provideHover(document, position) {
      const line = document.lineAt(position).text;
      const keywordMatch = line.match(/^(\w+):/);
      if (!keywordMatch) return null;

      const keyword = keywordMatch[1].toLowerCase();
      const docs = KEYWORD_DOCS[keyword];
      if (!docs) return null;

      // Only show hover when cursor is on the keyword portion
      if (position.character > keywordMatch[0].length) return null;

      const md = new vscode.MarkdownString();
      md.appendMarkdown(`**\`${keyword}:\`** — ${docs.description}\n\n`);
      if (docs.properties.length > 0) {
        md.appendMarkdown(
          `**Properties:** ${docs.properties.map((p) => `\`${p}:\``).join(", ")}`
        );
      }
      md.appendMarkdown(
        `\n\n[IntentText Spec](https://github.com/intenttext/IntentText/blob/main/docs/SPEC.md)`
      );

      return new vscode.Hover(md);
    },
  };
}

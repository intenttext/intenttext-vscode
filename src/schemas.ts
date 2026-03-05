export const ALL_KEYWORDS = [
  // Structure
  "title",
  "summary",
  "section",
  "sub",
  // Callouts
  "note",
  "info",
  "warning",
  "tip",
  "success",
  // Content
  "quote",
  "image",
  "link",
  "ref",
  "embed",
  "code",
  "end",
  // Tables
  "headers",
  "row",
  // Tasks
  "task",
  "done",
  "ask",
  // Agentic
  "step",
  "decision",
  "trigger",
  "loop",
  "checkpoint",
  "audit",
  "error",
  "import",
  "export",
  "progress",
  "context",
  "result",
  "handoff",
  "wait",
  "parallel",
  "retry",
  "gate",
  "call",
  "emit",
  // Metadata
  "agent",
  "model",
  // Document generation
  "font",
  "page",
  "break",
  "byline",
  "epigraph",
  "caption",
  "footnote",
  "toc",
  "dedication",
  // Divider (special)
  "divider",
] as const;

export interface PropertySchema {
  key: string;
  label: string;
  placeholder?: string;
  options?: string[];
}

export const BLOCK_SCHEMAS: Record<string, PropertySchema[]> = {
  step: [
    { key: "tool", label: "Tool to execute", placeholder: "tool-name" },
    { key: "input", label: "Input data", placeholder: "data" },
    { key: "output", label: "Output variable", placeholder: "var" },
    { key: "depends", label: "Step dependency", placeholder: "step-id" },
    { key: "id", label: "Unique step ID", placeholder: "step-id" },
    {
      key: "status",
      label: "Execution status",
      options: ["pending", "running", "done", "failed", "blocked"],
    },
    { key: "timeout", label: "Timeout duration", placeholder: "30s" },
  ],
  gate: [
    { key: "approver", label: "Approver", placeholder: "person-or-team" },
    { key: "timeout", label: "Timeout", placeholder: "24h" },
    { key: "fallback", label: "Fallback action", placeholder: "step-id" },
  ],
  decision: [
    { key: "if", label: "Condition", placeholder: "condition" },
    { key: "then", label: "True branch step", placeholder: "step-id" },
    { key: "else", label: "False branch step", placeholder: "step-id" },
  ],
  task: [
    { key: "owner", label: "Task owner", placeholder: "person" },
    { key: "due", label: "Due date", placeholder: "2026-03-15" },
    { key: "priority", label: "Priority", options: ["1", "2", "3"] },
    { key: "status", label: "Status", options: ["pending", "done"] },
  ],
  done: [
    { key: "owner", label: "Task owner", placeholder: "person" },
    { key: "due", label: "Due date", placeholder: "2026-03-15" },
  ],
  ask: [
    { key: "to", label: "Directed to", placeholder: "person" },
    { key: "priority", label: "Priority", options: ["1", "2", "3"] },
  ],
  parallel: [
    {
      key: "steps",
      label: "Step IDs to run in parallel",
      placeholder: "step-a,step-b",
    },
    { key: "join", label: "Join strategy", options: ["all", "any"] },
  ],
  retry: [
    { key: "max", label: "Max retries", placeholder: "3" },
    { key: "delay", label: "Delay between retries", placeholder: "5s" },
    {
      key: "backoff",
      label: "Backoff strategy",
      options: ["linear", "exponential"],
    },
  ],
  handoff: [
    { key: "from", label: "Source agent", placeholder: "agent-a" },
    { key: "to", label: "Target agent", placeholder: "agent-b" },
  ],
  call: [
    { key: "input", label: "Input data", placeholder: "data" },
    { key: "output", label: "Output variable", placeholder: "var" },
  ],
  trigger: [
    { key: "event", label: "Trigger event", placeholder: "event-name" },
    { key: "condition", label: "Trigger condition", placeholder: "expression" },
  ],
  loop: [
    { key: "over", label: "Iterable", placeholder: "items" },
    { key: "as", label: "Loop variable", placeholder: "item" },
    { key: "max", label: "Max iterations", placeholder: "100" },
  ],
  wait: [
    { key: "for", label: "Wait condition", placeholder: "step-id" },
    { key: "timeout", label: "Timeout", placeholder: "30s" },
  ],
  result: [
    { key: "depends", label: "Depends on step", placeholder: "step-id" },
  ],
  checkpoint: [{ key: "save", label: "Data to save", placeholder: "key" }],
  image: [
    { key: "src", label: "Image URL", placeholder: "https://..." },
    { key: "alt", label: "Alt text", placeholder: "description" },
    { key: "caption", label: "Caption", placeholder: "Figure 1" },
    { key: "width", label: "Width", placeholder: "100%" },
  ],
  link: [
    { key: "href", label: "URL", placeholder: "https://..." },
    { key: "title", label: "Link title", placeholder: "title" },
  ],
  embed: [
    { key: "src", label: "Embed URL", placeholder: "https://..." },
    { key: "type", label: "Embed type", options: ["iframe", "video", "audio"] },
  ],
  code: [{ key: "language", label: "Language", placeholder: "typescript" }],
  font: [
    { key: "family", label: "Font family", placeholder: "Georgia" },
    { key: "size", label: "Font size", placeholder: "12pt" },
    { key: "leading", label: "Line height", placeholder: "1.6" },
    { key: "weight", label: "Font weight", placeholder: "400" },
    { key: "heading", label: "Heading font", placeholder: "Helvetica" },
    { key: "mono", label: "Monospace font", placeholder: "Fira Code" },
  ],
  page: [
    { key: "size", label: "Page size", options: ["A4", "Letter", "Legal"] },
    { key: "margins", label: "Margins", placeholder: "2.5cm" },
    { key: "header", label: "Header text", placeholder: "text" },
    { key: "footer", label: "Footer text", placeholder: "text" },
    { key: "columns", label: "Column count", options: ["1", "2", "3"] },
    {
      key: "numbering",
      label: "Page numbering",
      options: ["arabic", "roman", "none"],
    },
    {
      key: "orientation",
      label: "Orientation",
      options: ["portrait", "landscape"],
    },
  ],
  byline: [
    { key: "date", label: "Publication date", placeholder: "2026-03-05" },
    { key: "publication", label: "Publication name", placeholder: "name" },
    { key: "role", label: "Author role", placeholder: "Senior Editor" },
  ],
  footnote: [{ key: "text", label: "Footnote text", placeholder: "text" }],
  toc: [
    { key: "depth", label: "Heading depth", options: ["1", "2", "3"] },
    { key: "title", label: "TOC title", placeholder: "Contents" },
  ],
  context: [
    { key: "key", label: "Context key", placeholder: "key" },
    { key: "value", label: "Context value", placeholder: "value" },
  ],
};

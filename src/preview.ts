import * as vscode from "vscode";
import { renderHTML, parseIntentText } from "./parser-bridge";

let panel: vscode.WebviewPanel | undefined;

function openPreview(side: boolean): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== "intenttext") {
    vscode.window.showWarningMessage("Open an IntentText (.it) file first.");
    return;
  }

  if (panel) {
    panel.reveal(side ? vscode.ViewColumn.Beside : vscode.ViewColumn.Active);
  } else {
    panel = vscode.window.createWebviewPanel(
      "intenttextPreview",
      "IntentText Preview",
      side ? vscode.ViewColumn.Beside : vscode.ViewColumn.Active,
      { enableScripts: false },
    );
    panel.onDidDispose(() => {
      panel = undefined;
    });
  }

  updatePreview(editor.document);
}

export function createPreviewCommands(): vscode.Disposable[] {
  return [
    vscode.commands.registerCommand("intenttext.preview", () =>
      openPreview(false),
    ),
    vscode.commands.registerCommand("intenttext.previewToSide", () =>
      openPreview(true),
    ),
  ];
}

export function updatePreview(document: vscode.TextDocument): void {
  if (!panel) return;
  if (document.languageId !== "intenttext") return;

  const source = document.getText();
  let html: string;
  try {
    const doc = parseIntentText(source);
    html = renderHTML(doc);
  } catch {
    html = `<html><body><p style="color:red;">Parse error — fix syntax and save again.</p></body></html>`;
  }

  panel.webview.html = wrapHtml(html);
}

function wrapHtml(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 1rem; line-height: 1.6; color: #222; }
    h1 { font-size: 1.8rem; margin-top: 0; }
    h2 { font-size: 1.4rem; }
    h3 { font-size: 1.15rem; }
    pre { background: #f5f5f5; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }
    code { font-family: "Fira Code", "Cascadia Code", monospace; }
    blockquote { border-left: 3px solid #999; padding-left: 1rem; color: #555; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 0.5rem; text-align: left; }
    th { background: #f0f0f0; }
    .callout { padding: 0.75rem 1rem; border-radius: 4px; margin: 0.5rem 0; }
    .callout-note, .callout-text { background: #e7f3fe; border-left: 4px solid #2196F3; }
    .callout-warning { background: #fff3cd; border-left: 4px solid #ffc107; }
    .callout-tip { background: #d4edda; border-left: 4px solid #28a745; }
    .callout-success { background: #d4edda; border-left: 4px solid #28a745; }
    .callout-info { background: #e7f3fe; border-left: 4px solid #17a2b8; }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}

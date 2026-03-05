import * as vscode from "vscode";
import { createDiagnosticsProvider } from "./diagnostics";
import { createHoverProvider } from "./hover";
import { createCompletionProvider } from "./completion";
import { createPreviewCommand, updatePreview } from "./preview";

const LANGUAGE_ID = "intenttext";

export function activate(context: vscode.ExtensionContext) {
  // Diagnostics
  const diagnosticCollection =
    vscode.languages.createDiagnosticCollection(LANGUAGE_ID);
  const updateDiagnostics = createDiagnosticsProvider(diagnosticCollection);

  let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  context.subscriptions.push(
    diagnosticCollection,

    // Run diagnostics on open
    vscode.workspace.onDidOpenTextDocument((doc) => {
      if (doc.languageId === LANGUAGE_ID) {
        updateDiagnostics(doc);
      }
    }),

    // Run diagnostics on change (debounced 500ms) + update preview
    vscode.workspace.onDidChangeTextDocument((event) => {
      if (event.document.languageId === LANGUAGE_ID) {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          updateDiagnostics(event.document);
          updatePreview(event.document);
        }, 500);
      }
    }),

    // Hover
    vscode.languages.registerHoverProvider(
      { language: LANGUAGE_ID },
      createHoverProvider(),
    ),

    // Completion
    vscode.languages.registerCompletionItemProvider(
      { language: LANGUAGE_ID },
      createCompletionProvider(),
      "|", // trigger on pipe
    ),

    // Preview command
    createPreviewCommand(),
  );

  // Run diagnostics for already-open documents
  for (const doc of vscode.workspace.textDocuments) {
    if (doc.languageId === LANGUAGE_ID) {
      updateDiagnostics(doc);
    }
  }
}

export function deactivate() {}

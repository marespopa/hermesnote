"use client";

import RegisteredCommands from "./editor-commands/RegisteredCommands";
import { buildEditorCommands } from "./editor-commands/build-editor-commands";
import {
  type EditorCommandsProps,
  useEditorCommandContext,
} from "./editor-commands/use-editor-command-context";

// Registers the app's global command-palette entries. Mounted once inside
// the editor route, alongside CommandPaletteProvider. The contributor modules
// keep command definitions focused while this component preserves their
// original registration order.
export default function EditorCommands(props: EditorCommandsProps) {
  const context = useEditorCommandContext(props);
  return <RegisteredCommands commands={buildEditorCommands(context)} />;
}

export type { EditorCommandsProps };

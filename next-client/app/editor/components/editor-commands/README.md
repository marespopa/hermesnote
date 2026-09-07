# Editor command contributors

`EditorCommands.tsx` is the single editor-route entry point for command-palette
registration. This directory separates command definitions by responsibility
without changing the public props contract or command behavior.

## Structure

- `use-editor-command-context.ts` owns the shared hooks and derived editor
  state. Its hook sequence mirrors the original monolithic component so hooks
  are called once and unconditionally.
- `build-editor-commands.ts` combines contributor groups in their original
  registration order.
- `document-vault-commands.ts` defines document lifecycle, file operations, and
  vault commands.
- `editor-ai-voice-commands.ts` defines editor formatting, templates, AI, and
  voice commands.
- `workspace-task-view-commands.ts` defines panels, panes, tabs, preferences,
  tasks, views, and workspace navigation.
- `RegisteredCommands.tsx` applies the existing `useRegisterCommand` pattern to
  the ordered command list.

## Ordering and behavior

Each contributor returns named command groups. `EditorCommands.tsx` combines
those groups in the same order as the former implementation. Conditional
commands are omitted from the list when unavailable; commands that remain
visible use their original `disabledReason`.

When adding a command, place it in the contributor matching its behavior and
insert its group in `EditorCommands.tsx` at the intended registration position.

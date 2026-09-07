# Command Palette

The command palette is the shared command and quick-open surface for HermesMarkdown.
`CommandPaletteProvider` owns registration, visibility, and recent-command state;
`CommandPalette` renders and executes the currently registered commands alongside vault
file results.

## Command contract

Register commands with `useRegisterCommand`. IDs must be stable and globally unique.
Commands may include a category, description, aliases/keywords, shortcut, disabled reason,
danger marker, and an asynchronous action. Prefer a visible disabled command with a useful
reason when the action is relevant but unavailable.

Feature components should expose reusable actions and register thin adapters over those
actions. Buttons, menus, shortcuts, and commands must share the same underlying behavior,
including confirmation dialogs and error reporting.

## Search and keyboard behavior

- `Ctrl/Cmd+K` and `Ctrl/Cmd+Shift+P` open the palette.
- A plain query searches vault files by name or path.
- `#` searches the vault-wide unique tag catalog; choosing a tag opens the file search filtered by that tag.
- `>` restricts results to commands.
- `!` searches indexed tasks.
- `%` searches Smart Views.
- `:` searches the live headings in the active note and moves the cursor to the chosen heading.
- Arrow keys change the active result; Enter or Tab runs it; Escape closes the overlay.

The result surface uses combobox/listbox semantics. Disabled commands remain discoverable
and explain which context or capability is required.

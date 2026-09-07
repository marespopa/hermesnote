"use client";

import {
  useRegisterCommand,
  type Command,
} from "@/app/components/CommandPalette/CommandPaletteContext";

function RegisteredCommand({ command }: { command: Command }) {
  useRegisterCommand(command);
  return null;
}

export default function RegisteredCommands({ commands }: { commands: Command[] }) {
  return (
    <>
      {commands.map((command) => (
        <RegisteredCommand key={command.id} command={command} />
      ))}
    </>
  );
}

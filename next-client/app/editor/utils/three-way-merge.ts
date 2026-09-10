export type ConflictChoice = "current" | "incoming";

type Change = {
  start: number;
  end: number;
  lines: string[];
};

const CURRENT_START = "<<<<<<< Current change";
const SEPARATOR = "=======";
const INCOMING_END = ">>>>>>> Incoming change";

function lines(text: string): string[] {
  return text === "" ? [] : text.split("\n");
}

function changesFrom(base: string[], changed: string[]): Change[] {
  const lengths = Array.from({ length: base.length + 1 }, () =>
    new Array<number>(changed.length + 1).fill(0),
  );

  for (let i = base.length - 1; i >= 0; i--) {
    for (let j = changed.length - 1; j >= 0; j--) {
      lengths[i][j] =
        base[i] === changed[j]
          ? lengths[i + 1][j + 1] + 1
          : Math.max(lengths[i + 1][j], lengths[i][j + 1]);
    }
  }

  const changes: Change[] = [];
  let i = 0;
  let j = 0;
  let start: number | null = null;
  let replacement: string[] = [];

  const commit = () => {
    if (start !== null) {
      changes.push({ start, end: i, lines: replacement });
      start = null;
      replacement = [];
    }
  };

  while (i < base.length || j < changed.length) {
    if (i < base.length && j < changed.length && base[i] === changed[j]) {
      commit();
      i++;
      j++;
    } else if (j < changed.length && (i === base.length || lengths[i][j + 1] >= lengths[i + 1][j])) {
      start ??= i;
      replacement.push(changed[j++]);
    } else {
      start ??= i;
      i++;
    }
  }
  commit();

  return changes;
}

function applyChanges(base: string[], changes: Change[], start: number, end: number): string[] {
  const output: string[] = [];
  let position = start;

  for (const change of changes) {
    output.push(...base.slice(position, change.start), ...change.lines);
    position = change.end;
  }

  output.push(...base.slice(position, end));
  return output;
}

function equalLines(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((line, index) => line === b[index]);
}

/**
 * Merges changes made independently to a common base. Conflicting regions are
 * represented with Git-compatible markers so they remain editable by hand.
 */
export function threeWayMerge(baseText: string, currentText: string, incomingText: string): string {
  const base = lines(baseText);
  const currentChanges = changesFrom(base, lines(currentText));
  const incomingChanges = changesFrom(base, lines(incomingText));
  const result: string[] = [];
  let position = 0;

  while (true) {
    const nextStart = Math.min(
      currentChanges.find((change) => change.start >= position)?.start ?? Infinity,
      incomingChanges.find((change) => change.start >= position)?.start ?? Infinity,
    );
    if (nextStart === Infinity) break;

    result.push(...base.slice(position, nextStart));
    let end = nextStart;
    let regionCurrent: Change[] = [];
    let regionIncoming: Change[] = [];
    let changed = true;

    while (changed) {
      changed = false;
      const include = (change: Change) =>
        change.start >= nextStart &&
        (change.start === nextStart || (end > nextStart && change.start < end));

      const nextCurrent = currentChanges.filter(
        (change) => include(change) && !regionCurrent.includes(change),
      );
      const nextIncoming = incomingChanges.filter(
        (change) => include(change) && !regionIncoming.includes(change),
      );

      if (nextCurrent.length || nextIncoming.length) {
        regionCurrent = [...regionCurrent, ...nextCurrent];
        regionIncoming = [...regionIncoming, ...nextIncoming];
        const nextEnd = Math.max(end, ...nextCurrent.map((change) => change.end), ...nextIncoming.map((change) => change.end));
        changed = nextEnd !== end || nextCurrent.length > 0 || nextIncoming.length > 0;
        end = nextEnd;
      }
    }

    const current = applyChanges(base, regionCurrent, nextStart, end);
    const incoming = applyChanges(base, regionIncoming, nextStart, end);
    const original = base.slice(nextStart, end);

    if (equalLines(current, incoming)) {
      result.push(...current);
    } else if (equalLines(current, original)) {
      result.push(...incoming);
    } else if (equalLines(incoming, original)) {
      result.push(...current);
    } else {
      result.push(CURRENT_START, ...current, SEPARATOR, ...incoming, INCOMING_END);
    }
    position = end;
  }

  result.push(...base.slice(position));
  return result.join("\n");
}

const conflictPattern = new RegExp(
  `${CURRENT_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n([\\s\\S]*?)\\n${SEPARATOR}\\n([\\s\\S]*?)\\n${INCOMING_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g",
);

export function countMergeConflicts(text: string): number {
  return (text.match(new RegExp(CURRENT_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) ?? []).length;
}

export function resolveMergeConflicts(text: string, choice: ConflictChoice): string {
  return text.replace(conflictPattern, (_, current: string, incoming: string) =>
    choice === "current" ? current : incoming,
  );
}

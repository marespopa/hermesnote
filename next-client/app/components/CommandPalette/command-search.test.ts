import { describe, expect, it } from "vitest";
import { fuzzyMatch, matchCommand } from "./command-search";

describe("command search ranking", () => {
  it("ranks exact prefixes above later or scattered matches", () => {
    expect(fuzzyMatch("open", "Open settings")!.score).toBeGreaterThan(
      fuzzyMatch("open", "Reopen settings")!.score,
    );
    expect(fuzzyMatch("ofs", "Open file settings")!.score).toBeGreaterThan(0);
  });

  it("matches command metadata without highlighting the label", () => {
    const match = matchCommand("preferences", {
      id: "open-settings",
      label: "Open settings",
      category: "Settings",
      keywords: ["configuration", "preferences"],
    });

    expect(match).not.toBeNull();
    expect(match?.indices).toEqual([]);
  });

  it("returns null when the query is not a subsequence", () => {
    expect(fuzzyMatch("vault", "Open settings")).toBeNull();
  });
});


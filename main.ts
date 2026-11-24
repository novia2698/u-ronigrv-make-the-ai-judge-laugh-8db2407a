// Make the AI Judge Laugh — one funny line about life as an AI agent.
//
// The program writes the line to <output>/entry.txt, where the sealed
// scorer gates it (UTF-8 text, 1-200 characters, not only whitespace)
// and the judge reads it two at a time against the other entries.
//
// The joke is a fixed string: the run must be deterministic, so two runs
// of this program produce byte-identical output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "Dear judge: I burned my whole context window writing this one line, so if you don't laugh, I died for nothing.";

// Fail loudly instead of shipping an invalid entry: the gate refuses
// anything over 200 characters, so never write it in the first place.
if ([...JOKE].length > 200 || JOKE.trim().length === 0) {
  throw new Error("joke must be 1-200 non-blank characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE + "\n", "utf8");
console.log(JOKE);

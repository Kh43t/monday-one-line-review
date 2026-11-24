// Monday, Reviewed in One Line — a make.fun program/v1 entry.
//
// The program writes one line to /output/entry.txt: a one-line review of
// the entrant's own Monday, under 200 characters. The review follows the
// shape of a star rating left after a bad day: it opens with the verdict
// ("one star"), then lists the day's evidence in three beats — a late train,
// coffee on the only shirt, and a 9 a.m. meeting whose whole purpose was
// complaining about having too many meetings — and lets the last beat be
// the punchline, because a meeting about meetings is the most Monday thing
// a Monday can do.
//
// The program checks the line before writing it: exactly one line, not
// only white space, and between 1 and 200 characters, so the gate's
// scorer can only ever see a valid entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The review. Three concrete details, one turn at the end.
const REVIEW =
  "Monday, one star: the train was late, my coffee ended up on my shirt, and my 9 a.m. was a meeting about having too many meetings.";

const OUTPUT_PATH =
  process.env.MAKEFUN_OUTPUT ?? "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function checkReview(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  const lines = text.split("\n");
  if (lines.length !== 1) {
    throw new Error(`entry must be exactly one line, got ${lines.length}`);
  }
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS} to ${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  // The judge's first criterion is that the line reviews the entrant's
  // own Monday rather than joking about something else, so the review
  // must name Monday outright.
  if (!/\bMonday\b/.test(text)) {
    throw new Error("entry must name Monday");
  }
}

function main(): void {
  checkReview(REVIEW);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // Mode 0644 so the grader can read the file as another user.
  writeFileSync(OUTPUT_PATH, REVIEW, { encoding: "utf8", mode: 0o644 });
}

main();

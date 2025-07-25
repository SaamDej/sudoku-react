import {
  generatePuzzle,
  setBoardLayout,
  answerString,
  prefilledString,
  createKeyMap,
} from ".";
import { SudokuCellAttributes } from "../types";

export const BORDER_TYPES = [
  [
    "xl:border-r-2 xl:border-b-2 border-r-1 border-b-1",
    "xl:border-b-2 border-b-1",
    "xl:border-l-2 xl:border-b-2 border-l-1 border-b-1",
  ],
  ["xl:border-r-2 border-r-1", "", "xl:border-l-2 border-l-1"],
  [
    "xl:border-r-2 xl:border-t-2 border-r-1 border-t-1",
    "xl:border-t-2 border-t-1",
    "xl:border-l-2 xl:border-t-2 border-l-1 border-t-1",
  ],
];

export const KEY_MAP: Map<any, any> = createKeyMap();
export const BOARD: SudokuCellAttributes[] = setBoardLayout(
  answerString,
  prefilledString
); // Initialize the board layout with the given answer and prefilled strings.
export const KEYS = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Backspace",
  "w",
  "W",
  "a",
  "A",
  "s",
  "S",
  "d",
  "D",
  ...Array(9)
    .fill("")
    .map((_, i) => `${i + 1}`),
];
export const MAX_HISTORY_SIZE = 10;
export const { answers: answers, displayBoard: disp } = generatePuzzle();
export const RESOLUTION: number = Math.floor((window.innerWidth - 8 - 16) / 9);

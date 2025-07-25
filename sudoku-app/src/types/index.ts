export type SudokuCellAttributes = {
  index: number;
  row: number;
  column: number;
  block: number;
  answer: number;
  displayNumber: number;
  prefilled: boolean;
};
export type CellNotes = boolean[] | null;

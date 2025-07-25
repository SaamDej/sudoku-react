import { SudokuCellAttributes, CellNotes } from "../types";

function createNotes(board: SudokuCellAttributes[]): CellNotes[] {
  const notesArray: CellNotes[] = board.map((element) => {
    if (element.prefilled) return null;
    else return Array(9).fill(false);
  });
  console.log(notesArray);
  return notesArray;
}

export default createNotes;

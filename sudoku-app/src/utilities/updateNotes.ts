import { SudokuCellAttributes } from "../components/SudokuCell";

function updateNotes(
  notes: boolean[][],
  setNotes: React.Dispatch<React.SetStateAction<boolean[][]>>,
  cellInput: number,
  cellIndex: number,
  row: number,
  column: number,
  block: number,
  displayNumbers: number[],
  board: SudokuCellAttributes[]
) {
  let newNotes: boolean[][] = displayNumbers.map((displayNum, i) => {
    if (notes[i] != Array(9).fill(false) && i != cellIndex) {
      if (
        board[i].row === row ||
        board[i].column === column ||
        board[i].block === block
      ) {
        let noteCell = notes[i].map((note, j) => {
          if (note === true && j === cellInput - 1) {
            return false;
          } else {
            return note;
          }
        });
        return noteCell;
      }
    }
    return notes[i];
  });
  setNotes(newNotes);
}

export default updateNotes;

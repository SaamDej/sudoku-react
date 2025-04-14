import { SudokuCellAttributes } from "../components/SudokuCell";

function updateNotes(
  notes: boolean[][],
  //setNotes: React.Dispatch<React.SetStateAction<boolean[][]>>,
  cellInput: number,
  cellIndex: number,
  displayNumbers: number[],
  board: SudokuCellAttributes[]
): boolean[][] {
  const row = board[cellIndex].row;
  const column = board[cellIndex].column;
  const block = board[cellIndex].block;
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
  return newNotes;
}

export default updateNotes;

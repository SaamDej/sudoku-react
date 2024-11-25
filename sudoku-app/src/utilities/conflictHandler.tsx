import { SudokuCellAttributes } from "../components/SudokuCell";
// This function checks if a user's input creates a confliction on the Sudoku Board.
// The variable conflict is returned true when the following is true
// about number that is inputted into a cell:
// * It is already found in the same block (3x3 cell grid)
// * It is already found in the same row and/or column across the entire board.

function conflictHandler(
  row: number,
  column: number,
  block: number,
  index: number,
  displayNumbers: number[],
  board: SudokuCellAttributes[]
) {
  let conflict = false;
  displayNumbers.forEach((displayNum, i) => {
    if (displayNum != 0 && i != index) {
      let currentCell = {
        row: board[i].row,
        column: board[i].column,
        block: board[i].block,
      };
      if (
        currentCell.row === row ||
        currentCell.column === column ||
        currentCell.block === block
      ) {
        if (displayNum === displayNumbers[index]) {
          conflict = true;
        }
      }
    }
  });
  return conflict;
}

export default conflictHandler;

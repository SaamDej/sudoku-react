import { SudokuCellAttributes } from "../components/SudokuCell";

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

import { SudokuCellAttributes } from "../types";

function checkSameNumber(
  index: number,
  displayNumbers: number[],
  currentCell: number
) {
  let shared = false;
  if (
    displayNumbers[index] === displayNumbers[currentCell] &&
    index !== currentCell
  ) {
    shared = true;
  }
  return shared;
}

export default checkSameNumber;

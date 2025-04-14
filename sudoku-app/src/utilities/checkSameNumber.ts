import { SudokuCellAttributes } from "../components/SudokuCell";

function checkSameNumber(
  index: number,
  displayNumbers: number[],
  currentCell: {
    attributes: SudokuCellAttributes;
    ref: HTMLDivElement;
  }
) {
  let shared = false;
  if (
    displayNumbers[index] === displayNumbers[currentCell.attributes.index] &&
    index !== currentCell.attributes.index
  ) {
    shared = true;
  }
  return shared;
}

export default checkSameNumber;

import { SudokuCellAttributes } from "../components/SudokuCell";

function setBoardLayout(answerArray: number[][], prefilledArray: boolean[][]) {
  let boardArray: SudokuCellAttributes[] = [];
  answerArray.forEach((block, blockIndex) => {
    block.forEach((answer, answerIndex) => {
      let cellIndex =
        answerIndex +
        6 * Math.floor(answerIndex / 3) +
        3 * (blockIndex % 3) +
        27 * Math.floor(blockIndex / 3);
      let cellRow = Math.floor(cellIndex / 9);
      let cellCol = cellIndex - cellRow * 9;
      let cell: SudokuCellAttributes = {
        index: cellIndex,
        row: cellRow,
        column: cellCol,
        block: blockIndex,
        answer: answer,
        displayNumber: prefilledArray[blockIndex][answerIndex] ? answer : 0,
        prefilled: prefilledArray[blockIndex][answerIndex],
      };
      boardArray.push(cell);
    });
  });
  boardArray = boardArray.sort((a, b) => {
    return a.index - b.index;
  });
  return boardArray;
}

export default setBoardLayout;

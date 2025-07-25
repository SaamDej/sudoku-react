import { SudokuCellAttributes } from "../types";
function setBoardLayout(answers: string, prefilled: string) {
  const answerArr = Array.from(answers).map((i) => {
    return Number(i);
  });
  const prefilledArr = Array.from(prefilled).map((i) => {
    if (i === ".") {
      return false;
    } else {
      return true;
    }
  });
  console.log("ANSWERS: ", answerArr);
  console.log("BOARD: ", prefilledArr);
  let boardArray: SudokuCellAttributes[] = answerArr.map((cell, i) => {
    const cellRow = Math.floor(i / 9);
    const cellCol = i - cellRow * 9;
    const block = 3 * Math.floor(cellRow / 3) + Math.floor(cellCol / 3);
    return {
      index: i,
      row: cellRow,
      column: cellCol,
      block: block,
      answer: cell,
      displayNumber: prefilledArr[i] ? cell : 0,
      prefilled: prefilledArr[i],
    };
  });
  return boardArray;
}

export default setBoardLayout;

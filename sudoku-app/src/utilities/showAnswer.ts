import { SudokuCellAttributes } from "../components/SudokuCell";

function showAnswer(board: SudokuCellAttributes[]) {
  const showAnswersArray: number[] = board.map((cell) => cell.answer);

  return showAnswersArray;
}
export default showAnswer;

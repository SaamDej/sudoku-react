function shuffleArray(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
  }
  return array;
}
function generatePuzzle() {
  let firstRow: number[] = new Array(9).fill(0).map((_, i) => i + 1);
  let fullAnswers: number[] = [];
  let prefilledBoard: (number | string)[] = [];
  let k: number = 0;
  // Generate First row:
  firstRow = shuffleArray(firstRow);
  //console.log(firstRow);

  for (let i = 0; i < 9; i++) {
    if (i !== 0) {
      if (i % 3 === 0) k += 1;
      else k = (k + 3) % 9;
    }

    for (let j = k; j < k + 9; j++) {
      fullAnswers.push(firstRow[j % 9]);
      let prefilled = Math.floor(Math.random() * 2);
      if (prefilled === 1) {
        prefilledBoard.push(firstRow[j % 9]);
      } else {
        prefilledBoard.push(".");
      }
    }
  }
  const answers = fullAnswers.join("");
  const displayBoard = prefilledBoard.join("");
  //console.log(answers, displayBoard);

  return { answers, displayBoard };
}

export default generatePuzzle;

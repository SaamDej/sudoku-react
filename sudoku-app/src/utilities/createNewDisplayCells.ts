const createNewDisplayCells = (
  displayCells: number[],
  currentCell: number,
  input: number
) => {
  const newArray = displayCells.slice();
  newArray[currentCell] = input;
  return newArray;
};

export default createNewDisplayCells;

function calculateBorder(array: string[][], row: number, column: number) {
  const blockColumn = column % 3;
  const blockRow = row % 3;
  return array[blockRow][blockColumn];
}
export default calculateBorder;

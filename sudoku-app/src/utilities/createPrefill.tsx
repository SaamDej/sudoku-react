// This function is meant to generate a randomized array used to determine which cells are prefilled or not.
function createPrefill() {
  let array = [];
  for (let i = 0; i < 9; i++) {
    let pc_arr = [];
    let max_prefill = 6;
    for (let j = 0; j < 9; j++) {
      const rand = Math.floor(Math.random() * 2);
      pc_arr.push(rand === 1 && max_prefill > 0 ? true : false);
      max_prefill = rand === 1 ? max_prefill - 1 : max_prefill;
    }
    array.push(pc_arr);
  }
  return array;
}
export default createPrefill;

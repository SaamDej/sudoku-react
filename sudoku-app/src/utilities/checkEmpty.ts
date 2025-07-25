import { CellNotes } from "../types/index";
function checkEmpty(arr: boolean[] | CellNotes) {
  if (arr) {
    return arr.every((i) => i === false);
  } else return false;
}

export default checkEmpty;

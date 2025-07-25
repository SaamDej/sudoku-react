const Tutorial = () => {
  return (
    <>
      <p className="pt-3 text-left">
        Sudoku is a puzzle game where the player must fill every empty cell
        (square) on a <b>9 x 9 cell grid</b> split into a{" "}
        <b>3 x 3 grid of cell blocks</b> (each being a 3 x 3 cell grid) with{" "}
        <b>a number between 1 and 9</b>. Some of the cells have their answers
        already given. These <b>prefilled cells</b> are indicated by their
        answers being displayed in <b>black</b> and <b>cannot be edited</b>.
        Numbers inputted into empty (editable) cells will be displayed with a{" "}
        <b className="text-blue-500">blue color</b> to indicate that they have
        been <b>inputted by the player</b>.
      </p>
      <h1 className="text-xl font-semibold underline">Rules</h1>
      <p>
        When filling a cell, the player must make sure that the answer does not
        conflict with the following condition based on the numbers 1 through 9.
      </p>
      <p className="font-bold text-red">
        A given number cannot appear in any cell block, column, and/or row more
        than once.
      </p>
      <p>
        If the player inputs an answer which conflicts with this condition based
        on the filled cells (both prefilled and player-inputted), the{" "}
        <b>conflicting cells</b> will be{" "}
        <b className="text-red-500">highlighted red</b>.
      </p>
      <p>
        Once the player{" "}
        <b>fills every empty cell without having any conflicting cells</b>, the
        puzzle is <b className="text-green-600">complete</b>.
      </p>
      <h1 className="text-xl font-semibold underline">Controls</h1>
      <p>
        The Sudoku grid can be interacted with via{" "}
        <b>keyboard and/or onscreen controls</b>.
      </p>
      <p>
        <b className="underline">Selecting a cell :</b> Any cell on the grid can
        be selected by either <b>clicking on cell the with the mouse pointer</b>
        , or by navigating using the following keys:
      </p>
      <ul className="list-disc list-inside">
        <li>
          <b>W / Up Arrow</b> : Selects the cell above the current cell.
        </li>
        <li>
          <b>A / Left Arrow</b> : Selects the cell below.
        </li>
        <li>
          <b>S / Down Arrow</b> : Selects the cell to the left.
        </li>
        <li>
          <b>D / Right Arrow</b> : Selects the cell to the right.
        </li>
      </ul>
      <p>
        <b className="underline">Fill a cell :</b> Once a fillable cell has been
        selected, press any of the <b>number keys (1-9)</b>, or
        <b> click on one of the nine number buttons</b> below the grid with the
        mouse pointer.
      </p>
      <p>
        <b className="underline">Clear a cell :</b> Press the{" "}
        <b>Backspace key</b>, or <b>click the eraser button</b>, with a cell
        selected.
      </p>
      <p>
        <b className="underline">Note Mode :</b> This feature allows the player
        to <b>record the potential answers</b> of an empty cell without actually
        filling it with an answer. Any numbers inputted into an empty cell with
        Note mode <b>enabled</b> will <b>mark the cell with a "note"</b> of that
        number, allowing for <b>multiple notes on one cell</b>.{" "}
        <b>Hold the Shift key</b> to switch Note mode on (or off) until the key
        is released. <b>Click the "Note mode" button</b> below the grid to
        toggle Note mode on or off. Notes can be cleared with the same controls
        as listed above. By default Note mode is off.
      </p>
    </>
  );
};

export default Tutorial;

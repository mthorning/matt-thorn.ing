import { useReducer, createContext, useContext, type Dispatch } from 'react';
import styles from './styles.module.css';
type Coords = [number, number];

type Cell = {
  coords: Coords;
  hasBomb: boolean;
  status: undefined | 'flagged' | number | 'exploded';
};

type State = {
  kaboom: boolean;
  grid: Cell[][];
};

type ClickedCell = ['CLICKED_CELL', { coords: Coords; hasBomb: boolean }];
type Action = ClickedCell;

function Cell({ cell }: { cell: Cell }) {
  const { state, dispatch } = useContext(context);

  return (
    <div className={styles.cell}>
      {state.kaboom && cell.hasBomb
        ? 'B'
        : (() => {
            switch (cell.status) {
              case undefined:
                return (
                  <button
                    className={styles.button}
                    onClick={() => dispatch(['CLICKED_CELL', cell])}
                  />
                );
              case 'flagged':
                return <button className={styles.button}>F</button>;
              default:
                return cell.status;
            }
          })()}
    </div>
  );
}

function reducer(state: State, [action, payload]: Action) {
  function countBombs(currentRow: number, currentCol: number): number {
    return [
      [0, 1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ].reduce((acc, [rowOffset, colOffset]) => {
      const row = currentRow + rowOffset;
      const col = currentCol + colOffset;
      if (row < 0 || col < 0 || row > GRID_ROWS - 1 || col > GRID_COLS - 1) {
        return acc;
      }

      const cell = state.grid[row][col];
      const numBombs = Number(cell.hasBomb);

      return (acc += numBombs);
    }, 0);
  }

  switch (action) {
    case 'CLICKED_CELL':
      const { hasBomb } = payload;
      if (hasBomb) {
        return { ...state, kaboom: true };
      }

      const {
        coords: [row, col],
      } = payload;
      const grid = [...state.grid];
      grid[row][col].status = countBombs(row, col);

      return { ...state, grid };

    default:
      return state;
  }
}

const ar = (size: number): undefined[] => new Array(size).fill(undefined);

const GRID_ROWS = 10;
const GRID_COLS = 10;
const TOTAL_BOMBS = 10;

function newGameState(): State {
  const bombs = ar(TOTAL_BOMBS).map(
    () =>
      [GRID_ROWS, GRID_COLS].map((x) => Math.floor(Math.random() * x)) as Coords
  );

  return {
    kaboom: false,
    grid: ar(GRID_ROWS).map((_, row) =>
      ar(GRID_COLS).map((status, col) => ({
        status,
        hasBomb: bombs.some(([y, x]) => row === y && col === x),
        coords: [row, col],
      }))
    ),
  };
}

const context = createContext<{ state: State; dispatch: Dispatch<Action> }>({
  state: {
    kaboom: false,
    grid: [],
  },
  dispatch: () => undefined,
});

export default function Minesweeper() {
  const [state, dispatch] = useReducer(reducer, newGameState());
  return (
    <context.Provider value={{ state, dispatch }}>
      <div className={styles.grid}>
        {state.grid.map((cells: Cell[], i: number) => (
          <div key={i} className={styles.row}>
            {cells.map((cell) => (
              <Cell key={cell.coords.toString()} cell={cell} />
            ))}
          </div>
        ))}
      </div>
    </context.Provider>
  );
}

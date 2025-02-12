import { useReducer, createContext, useContext, type Dispatch } from 'react';
import styles from './styles.module.css';
type Coords = [number, number];

type Cell = {
  coords: Coords;
  hasBomb: boolean;
  status: undefined | 'flagged' | number | 'exploded';
};

type Grid = Cell[][];

type State = {
  flagsRemaining: number;
  kaboom: boolean;
  grid: Grid;
};

type ClickedCell = ['CLICKED_CELL', Cell];
type FlagCell = ['FLAG_CELL', Cell];
type UnFlagCell = ['UNFLAG_CELL', Cell];
type Action = ClickedCell | FlagCell | UnFlagCell;

function Toolbar() {
  const { state } = useContext(context);
  return (
    <div className={styles.toolbar}>
      Flags remaining: {state.flagsRemaining}
    </div>
  );
}
function Cell({ cell }: { cell: Cell }) {
  const { state, dispatch } = useContext(context);

  return (
    <div className={styles.cell}>
      {state.kaboom && cell.hasBomb && cell.status !== 'exploded' ? (
        <div>
          <span>💣</span>
        </div>
      ) : (
        (() => {
          switch (cell.status) {
            case undefined:
              return (
                <button
                  className={styles.button}
                  onContextMenu={(e) => e.preventDefault()}
                  onMouseDown={(e) => {
                    dispatch([
                      e.button === 2 ? 'FLAG_CELL' : 'CLICKED_CELL',
                      cell,
                    ]);
                  }}
                />
              );
            case 'flagged':
              return (
                <button
                  disabled
                  className={styles.button}
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                  onMouseDown={(e) => {
                    if (e.button === 2) {
                      dispatch(['UNFLAG_CELL', cell]);
                    }
                  }}
                >
                  ⛳
                </button>
              );
            case 'exploded':
              return (
                <div className={styles.exploded}>
                  <span className={styles.explosion}>💥</span>
                </div>
              );

            default:
              return cell.status || '';
          }
        })()
      )}
    </div>
  );
}

const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [1, -1],
  [1, 1],
  [-1, -1],
];

function isOutOfBounds(coords: Coords): boolean {
  const [row, col] = coords;
  return row < 0 || col < 0 || row > GRID_ROWS - 1 || col > GRID_COLS - 1;
}

function countBombs(grid: Grid, coords: Coords): number {
  const [currentRow, currentCol] = coords;

  return directions.reduce((acc, [rowOffset, colOffset]) => {
    const row = currentRow + rowOffset;
    const col = currentCol + colOffset;
    if (isOutOfBounds([row, col])) {
      return acc;
    }

    const cell = grid[row][col];
    const numBombs = Number(cell.hasBomb);

    return (acc += numBombs);
  }, 0);
}

function updateGrid(grid: Grid, coords: Coords, newCell: Partial<Cell>): Grid {
  const [row, col] = coords;
  const newGrid = [...grid.map((col) => [...col])];
  newGrid[row][col] = { ...newGrid[row][col], ...newCell };
  return newGrid;
}

function walkAbout(grid: Grid, coords: Coords): Grid {
  const [currentRow, currentCol] = coords;
  if (isOutOfBounds([currentRow, currentCol])) return grid;

  const cell = grid[currentRow][currentCol];
  if (cell.status !== undefined) return grid;

  const bombs = countBombs(grid, [currentRow, currentCol]);
  grid = updateGrid(grid, coords, { status: bombs });
  if (bombs > 0) return grid;

  directions.forEach(([rowOffset, colOffset]) => {
    const row = currentRow + rowOffset;
    const col = currentCol + colOffset;
    grid = walkAbout(grid, [row, col]);
  });

  return grid;
}

function reducer(state: State, [action, payload]: Action) {
  switch (action) {
    case 'CLICKED_CELL':
      if (payload.hasBomb) {
        return {
          ...state,
          grid: updateGrid(state.grid, payload.coords, { status: 'exploded' }),
          kaboom: true,
        };
      }
      return { ...state, grid: walkAbout(state.grid, payload.coords) };

    case 'FLAG_CELL':
      if (state.flagsRemaining) {
        return {
          ...state,
          grid: updateGrid(state.grid, payload.coords, { status: 'flagged' }),
          flagsRemaining: state.flagsRemaining - 1,
        };
      }
      return state;

    case 'UNFLAG_CELL':
      return {
        ...state,
        grid: updateGrid(state.grid, payload.coords, { status: undefined }),
        flagsRemaining: state.flagsRemaining + 1,
      };

    default:
      return state;
  }
}

const ar = (size: number): undefined[] => new Array(size).fill(undefined);

const GRID_ROWS = 10;
const GRID_COLS = 10;
const TOTAL_BOMBS = 10;

function newGameState(): State {
  //TODO: make sure we always get 10 as sometimes there could be duplicates
  const bombs = ar(TOTAL_BOMBS).map(
    () =>
      [GRID_ROWS, GRID_COLS].map((x) => Math.floor(Math.random() * x)) as Coords
  );

  return {
    flagsRemaining: TOTAL_BOMBS,
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
    flagsRemaining: 0,
    kaboom: false,
    grid: [],
  },
  dispatch: () => undefined,
});

export default function Minesweeper() {
  const [state, dispatch] = useReducer(reducer, newGameState());
  return (
    <context.Provider value={{ state, dispatch }}>
      <Toolbar />
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

import React, { useState } from "react";
import produce from "immer";

import "./App.css";

const NUM_ROWS = 30;
const NUM_COLS = 40;

const App = () => {
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < NUM_ROWS; i++) {
            rows.push(Array(NUM_COLS).fill(0));
        }
        // return the initial state: grid
        return rows;
    });

    console.log(grid);
    return (
        <div
            style={{
                display: "grid",
                margin: "40px 40px",
                gridTemplateColumns: `repeat(${NUM_COLS}, 30px)`,
                gridTemplateRows: `repeat(${NUM_ROWS}, 30px)`,
            }}
        >
            {grid.map((rows, i) =>
                rows.map((col, j) => (
                    <div
                        key={`${i}-${j}`}
                        onClick={() => {
                            const newGrid = produce(grid, (gridCopy) => {
                                gridCopy[i][j] = 1;
                            });
                            setGrid(newGrid);
                        }}
                        style={{
                            width: 25,
                            height: 25,
                            backgroundColor: grid[i][j] ? "pink" : undefined,
                            border: "solid 1px #4d5259",
                        }}
                    />
                ))
            )}
        </div>
    );
};

export default App;

import React, { useState } from "react";

import "./App.css";

const NUM_ROWS = 40;
const NUM_COLS = 60;

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
                gridTemplateColumns: `repeat(${NUM_COLS}, 20px)`,
            }}
        >
            {grid.map((rows, i) =>
                rows.map((col, j) => (
                    <div
                        key={`${i}-${j}`}
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: grid[i][j] ? "pink" : undefined,
                            border: "solid 1px black",
                        }}
                    />
                ))
            )}
        </div>
    );
};

export default App;

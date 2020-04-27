import React, { useState } from "react";
import produce from "immer";
import { Button, Container } from "@material-ui/core";

import "./App.css";

const NUM_ROWS = 28;
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
        <Container style={{ marginTop: "20px" }}>
            <Button variant="contained" color="primary">
                Start
            </Button>
            <div
                style={{
                    marginTop: "20px",
                    display: "grid",
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
                                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                                });
                                setGrid(newGrid);
                            }}
                            style={{
                                width: 25,
                                height: 25,
                                backgroundColor: grid[i][j]
                                    ? "pink"
                                    : undefined,
                                border: "solid 1px #4d5259",
                            }}
                        />
                    ))
                )}
            </div>
        </Container>
    );
};

export default App;

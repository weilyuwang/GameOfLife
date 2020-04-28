import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import { Button, Container } from "@material-ui/core";

import "./App.css";

const NUM_ROWS = 28;
const NUM_COLS = 40;

const operations = [
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
];

const App = () => {
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < NUM_ROWS; i++) {
            rows.push(Array(NUM_COLS).fill(0));
        }
        // return the initial state: grid
        return rows;
    });

    const [running, setRunning] = useState(false);

    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        setGrid((curGrid) => {
            return produce(curGrid, (gridCopy) => {
                for (let i = 0; i < NUM_ROWS; i++) {
                    for (let j = 0; j < NUM_COLS; j++) {
                        let neighbors = 0;
                        // find neighbors from 8 directions
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            if (
                                newI >= 0 &&
                                newI < NUM_ROWS &&
                                newJ >= 0 &&
                                newJ < NUM_COLS
                            ) {
                                // add to neighbors
                                neighbors += curGrid[newI][newJ];
                            }
                        });

                        if (neighbors < 2 || neighbors > 3) {
                            // if has less than 2 or greater than 3 neighbors - dead
                            gridCopy[i][j] = 0;
                        } else if (curGrid[i][j] === 0 && neighbors === 3) {
                            // if has exactly 3 neighbors - come alive
                            gridCopy[i][j] = 1;
                        }
                    }
                }
            });
        });

        // simulate
        setTimeout(runSimulation, 1000);
    }, []);

    console.log(grid);
    return (
        <Container style={{ marginTop: "20px" }}>
            <Button
                onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true;
                        runSimulation();
                    }
                }}
                variant="contained"
                color="primary"
            >
                {running ? "STOP" : "START"}
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
                                    ? "#40d6db"
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

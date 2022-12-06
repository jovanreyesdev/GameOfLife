import { React, useEffect, useCallback, useState, useMemo } from 'react';
import Board from './components/Board';
import Cell from './components/Cell';

import './App.css';

const GENERATIONS = 1000;
const STARTING_POINTS = [7, 12, 17];

function App() {
  let timer = null;
  const emptyCells = new Array(25)
      .fill(0)
      .map((item, index) => STARTING_POINTS.includes(index) ? 1 : 0);

  const [counter, setCounter] = useState(0);
  const [cells, setCells] = useState(emptyCells);


  useEffect(() => {
    if (counter < GENERATIONS) {
      timer = setTimeout(() => {
        setCounter((prevState) => prevState + 1);

        const newGeneration = generateCells();
        setCells(newGeneration);
      }, [100]);
    }

    return () => clearTimeout(timer);
  }, [counter]);

  const generateCells = () => {
    const generation = cells.map((c, index) => {
      const left = cells[index - 1];
      const right = cells[index + 1];
      const top = cells[index - 5];
      const topleft = cells[index - 6];
      const topright = cells[index - 4]
      const bottom = cells[index + 5];
      const bottomleft = cells[index + 4]
      const bottomright = cells[index + 6];
      
      const neighbors = [
        left,
        right,
        top,
        bottom,
        topleft,
        topright,
        bottomleft,
        bottomright
      ].filter((c) => c === 1);

      if (c === 1 && neighbors.length > 1) {
        return 1;
      }

      if (c === 0 && neighbors.length === 3) {
        return 1;
      }

      return 0;

    });

    return generation;
  };

  const onGenerateClick = () => {
    const newGeneration = generateCells();
    setCells(newGeneration);
  }

  const gameOfLife = useMemo(() => (
    <Board>
      {cells.map((c) => (
        <Cell alive={!!c} />
      ))}
    </Board>
  ), [cells]);

  return (
    <div className="App">
      <button type="button" onClick={onGenerateClick}>
        Generate
      </button>
      {gameOfLife}
    </div>
  );
}

export default App;

import React from 'react';

function Board({ children }) {

  return (
    <div className="board">
      {children}
    </div>
  );
}

export default Board;
import React from 'react';

function Cell({ alive }) {

  return alive ? <div className="cell white" /> : <div className="cell" />;
}

export default Cell;
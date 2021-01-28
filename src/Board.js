import React from "react";
import "./styles.css";

export default function Board({ board, handleMove }) {
  return (
    <>
      <div className="container">
        {board.flat().map((i, key) => (
          <span
            key={key}
            className={`dot ${i === 1 ? "red" : i === 2 ? "black" : null}`}
            onClick={() => handleMove(key % 7)}
          ></span>
        ))}
      </div>
    </>
  );
}

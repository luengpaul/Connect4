import React, { Component } from "react";
import Board from "./Board.js";

class GameManager extends Component {
  constructor() {
    super();
    this.state = {
      board: new Array(7).fill().map(() => new Array(7).fill().map(() => 0)),
      playerTurn: true,
      complete: false
    };
  }

  legalMoves = () => {
    let arr = [];
    for (let j = 0; j < this.state.board.length; j++) {
      for (let i = this.state.board.length - 1; i >= 0; i--) {
        if (this.state.board[i][j] === 0) {
          arr.push(j);
          break;
        }
      }
    }
    return arr;
  };

  getLegalRow = (j) => {
    for (let i = this.state.board.length - 1; i >= 0; i--) {
      if (this.state.board[i][j] === 0) {
        return i;
      }
    }
  };

  winner = (i, j, player) => {
    let counter = 0;
    let x = i;
    let y = j;
    let board = this.state.board;
    // Check Left
    while (y >= 0 && counter < 4 && board[i][y] === player) {
      counter += 1;
      y -= 1;
    }
    // Check Right
    y = j + 1;
    while (y < board.length && counter < 4 && board[i][y] === player) {
      counter += 1;
      y += 1;
    }
    y = j;
    if (counter === 4) {
      return true;
    }

    counter = 0;
    //up
    while (x >= 0 && counter < 4 && board[x][j] === player) {
      counter += 1;
      x -= 1;
    }

    //down
    x = i + 1;
    while (x < board.length && counter < 4 && board[x][y] === player) {
      counter += 1;
      x += 1;
    }

    if (counter === 4) {
      return true;
    }
    //diagonal left down (-1, +1)
    counter = 0;
    [x, y] = [i, j];
    while (
      x >= 0 &&
      y < board.length &&
      counter < 4 &&
      board[x][y] === player
    ) {
      counter += 1;
      x -= 1;
      y += 1;
    }
    //diagonal right up (+1, -1)
    x = i + 1;
    y = j - 1;
    while (
      x < board.length &&
      y >= 0 &&
      counter < 4 &&
      board[x][y] === player
    ) {
      counter++;
      y -= 1;
      x += 1;
    }
    if (counter === 4) {
      return true;
    }

    // diagonal left up (-1, -1)
    counter = 0;
    [x, y] = [i, j];
    while (x >= 0 && y >= 0 && counter < 4 && board[x][y] === player) {
      counter += 1;
      x -= 1;
      y -= 1;
    }
    // diagonal right down (1, 1)
    [x, y] = [i + 1, j + 1];
    while (
      x < board.length &&
      y < board.length &&
      counter < 4 &&
      board[x][y] === player
    ) {
      counter += 1;
      x += 1;
      y += 1;
    }
    if (counter === 4) {
      return true;
    }

    if (this.legalMoves().length === 0) {
      alert("Tie");
      this.setState({ complete: true });
      return;
    }
    console.log("no winner yet");
    return false;
  };

  computerMove = () => {
    if (!this.state.complete) {
      let moves = this.legalMoves();
      if (moves.length === 0) {
        return;
      }
      let col = Math.floor(Math.random() * moves.length);
      let row = this.getLegalRow(moves[col]);
      let tempBoard = this.state.board;
      tempBoard[row][col] = 2;
      this.setState({ board: tempBoard, playerTurn: true });

      if (this.winner(row, col, 2)) {
        this.setState({ complete: true });
        alert("Computer Won");
      }
    }
  };

  play = (j) => {
    if (this.legalMoves().includes(j) && !this.state.complete) {
      let temp = this.state.board;
      let i = this.getLegalRow(j);
      temp[i][j] = 1;
      this.setState({
        board: temp
      });
      if (this.winner(i, j, 1)) {
        this.setState({ complete: true });
        alert("Player Won");
      } else if (!this.state.complete) {
        this.computerMove();
      }
    }
  };

  render() {
    return (
      <>
        <Board board={this.state.board} handleMove={this.play}></Board>
      </>
    );
  }
}

export default GameManager;

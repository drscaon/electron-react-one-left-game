import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import ELEMENT_TYPE from '../config/constants';

// renders the board's matrix (7x7)
class BoardMatrix extends Component {
  propTypes = {
    chosenPin: PropTypes.number.isRequired,
    squares: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onClick: PropTypes.func.isRequired,
    isDiagAllowed: PropTypes.bool.isRequired
  };

  renderSquare(i) {
    if (i === this.props.chosenPin) {
      return (
        <Square
          value={ELEMENT_TYPE.CHOSEN}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderRow(currentRow, cols) {
    const rowItems = [];
    for (let j = 0; j < cols; j += 1) {
      rowItems.push(this.renderSquare(cols * currentRow + j));
    }
    return <div className="board-row">{rowItems}</div>;
  }
  renderHorizontalLines() {
    const n = Math.sqrt(this.props.squares.length);
    const response = [];
    let [x1, x2, y] = [0, 0, 0];

    for (let row = 0; row < n; row += 1) {
      y = `${(row * 100) / n + 100 / (2 * n)}%`;
      for (let i = 0; i < n - 1; i += 1) {
        x1 = `${(i * 100) / n + 0.5 * (100 / n)}%`;
        x2 = `${(i * 100) / n + 1.5 * (100 / n)}%`;
        if (
          this.props.squares[n * row + i] &&
          this.props.squares[n * row + i + 1] &&
          this.props.squares[n * row + i] !== ELEMENT_TYPE.EMPTY &&
          this.props.squares[n * row + i + 1] !== ELEMENT_TYPE.EMPTY
        )
          response.push(<line x1={x1} y1={y} x2={x2} y2={y} stroke="black" />);
      }
    }
    return response;
  }
  renderVerticalLines() {
    const n = Math.sqrt(this.props.squares.length);
    const response = [];
    let [y1, y2, x] = [0, 0, 0];
    for (let col = 0; col < n; col += 1) {
      y1 = `${(col * 100) / n + 0.5 * (100 / n)}%`;
      y2 = `${(col * 100) / n + 1.5 * (100 / n)}%`;
      for (let i = 0; i < n; i += 1) {
        x = `${(i * 100) / n + 0.5 * (100 / n)}%`;
        if (
          this.props.squares[n * col + i] &&
          this.props.squares[n * col + i + n] &&
          this.props.squares[n * col + i] !== ELEMENT_TYPE.EMPTY &&
          this.props.squares[n * col + i + n] !== ELEMENT_TYPE.EMPTY
        )
          response.push(<line x1={x} y1={y1} x2={x} y2={y2} stroke="black" />);
      }
    }
    return response;
  }
  renderDiagonalLines() {
    const n = Math.sqrt(this.props.squares.length);
    const response = [];
    let y1 = 0;
    let y2 = 0;
    let x1 = 0;
    let x2 = 0;

    for (let col = 0; col < n; col += 1) {
      y1 = `${(col * 100) / n + 0.5 * (100 / n)}%`;
      y2 = `${(col * 100) / n + 1.5 * (100 / n)}%`;
      for (let i = 1; i < n; i += 1) {
        x1 = `${(i * 100) / n + 0.5 * (100 / n)}%`;
        x2 = `${(i * 100) / n - 0.5 * (100 / n)}%`;
        if (
          this.props.squares[n * col + i] &&
          this.props.squares[n * col + i + n - 1] &&
          this.props.squares[n * col + i] !== ELEMENT_TYPE.EMPTY &&
          this.props.squares[n * col + i + n - 1] !== ELEMENT_TYPE.EMPTY
        )
          response.push(
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />
          );
      }
    }
    return response;
  }
  render() {
    const horizontalLines = [];
    const verticalLines = [];
    const diagonalLines = [];
    horizontalLines.push(this.renderHorizontalLines(this.props.squares.length));
    verticalLines.push(this.renderVerticalLines(this.props.squares.length));
    if (this.props.isDiagAllowed) {
      diagonalLines.push(this.renderDiagonalLines(this.props.squares.length));
    }
    // consider the board as being always a perfect square, so...
    // take n from the length of the board configuration
    const rows = Math.sqrt(this.props.squares.length); // totalLen=49 n=7 , totalLen=25 n=5
    const cols = rows;
    const response = [];
    for (let i = 0; i < rows; i += 1) {
      response.push(this.renderRow(i, cols));
    }
    return (
      <div>
        <div className="divLines">
          <svg width="auto" height="auto">
            {horizontalLines}
            {verticalLines}
            {diagonalLines}
          </svg>
        </div>
        {response}
      </div>
    );
  }
}

export default BoardMatrix;

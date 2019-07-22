import React, { Component } from 'react';
import Select from 'react-select';
import BOARDS from '../config/boards';
import GameTable from './GameTable';
import ELEMENT_TYPE from '../config/constants';

const board = BOARDS;

class Game extends Component {
  // e: empty / p: pin / c: chosen / h: hole

  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      boardName: 'Standard',
      squares: board.Standard.Pins.slice(),
      rotation: board.Standard.Rotation,
      // eslint-disable-next-line react/no-unused-state
      clipPath: board.Standard.ClipPath,
      chosenPin: null
    };
  }

  restart() {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      boardName: 'Standard',
      squares: board.Standard.Pins.slice(),
      rotation: board.Standard.Rotation,
      // eslint-disable-next-line react/no-unused-state
      clipPath: board.Standard.ClipPath,
      chosenPin: null
    });
  }

  tryMove(origin, destiny, isDiagAllowed) {
    // has a pin between?
    // +-14 diff (vertical)  [pin = +-7]
    // +-2 diff (horizontal) [pin = +-1]
    // (diagonal top-right)[+14+2]
    // (diagonal top-left) [+14-2]
    // (diagonal bottom-right)[+14+2]
    // (diagonal bottom-left)[-14+2]
    // 3-11 16-12-8

    const numHorizontalPins = Math.sqrt(this.state.squares.length);
    let middlePinPosition;
    const diff = destiny - origin; // 24-10=14
    if (
      diff === 2 * numHorizontalPins &&
      this.state.squares[origin + numHorizontalPins] === ELEMENT_TYPE.PIN
    ) {
      // down
      middlePinPosition = origin + numHorizontalPins;
    } else if (
      diff === -(2 * numHorizontalPins) &&
      this.state.squares[origin - numHorizontalPins] === ELEMENT_TYPE.PIN
    ) {
      // up
      middlePinPosition = origin - numHorizontalPins;
    } else if (
      diff === 2 &&
      this.state.squares[origin + 1] === ELEMENT_TYPE.PIN
    ) {
      // right
      middlePinPosition = origin + 1;
    } else if (
      diff === -2 &&
      this.state.squares[origin - 1] === ELEMENT_TYPE.PIN
    ) {
      // left
      middlePinPosition = origin - 1;
    } else if (isDiagAllowed) {
      if (
        diff === 2 * numHorizontalPins + 2 &&
        this.state.squares[origin + numHorizontalPins + 1] === ELEMENT_TYPE.PIN
      ) {
        // topright
        middlePinPosition = origin + numHorizontalPins + 1;
      } else if (
        diff === 2 * numHorizontalPins - 2 &&
        this.state.squares[origin + numHorizontalPins - 1] === ELEMENT_TYPE.PIN
      ) {
        // topright
        middlePinPosition = origin + numHorizontalPins - 1;
      } else if (
        diff === -(2 * numHorizontalPins - 2) &&
        this.state.squares[origin - numHorizontalPins + 1] === ELEMENT_TYPE.PIN
      ) {
        // bottomright
        middlePinPosition = origin - numHorizontalPins + 1; // 11-5+1=7
      } else if (
        diff === -(2 * numHorizontalPins + 2) &&
        this.state.squares[origin - numHorizontalPins - 1] === ELEMENT_TYPE.PIN
      ) {
        // bottomleft
        middlePinPosition = origin - numHorizontalPins - 1;
      } else {
        return false;
      }
    } else {
      return false;
    }

    const lastSquares = this.state.squares;
    lastSquares[middlePinPosition] = 'h';
    lastSquares[origin] = 'h';
    lastSquares[destiny] = ELEMENT_TYPE.PIN;
    const squares = lastSquares.slice();
    this.setState({
      chosenPin: null,
      squares
    });
  }

  handleClick(i) {
    // Clicked a pin (chosen or not)
    if (
      this.state.squares[i] === ELEMENT_TYPE.PIN ||
      this.state.squares[i] === ELEMENT_TYPE.CHOSEN
    ) {
      this.setState({
        chosenPin: this.state.chosenPin === i ? null : i
      });
    } else if (this.state.squares[i] === 'h') {
      // Clicked a hole
      if (this.state.chosenPin != null) {
        // evaluate move
        this.tryMove(
          this.state.chosenPin,
          i,
          this.state.rotation === 'rotate(45deg)'
        );
      }
    }
  }

  handleBoardNameChange(event) {
    const boardName = event.value;
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      boardName,
      squares: board[boardName].Pins.slice(),
      rotation: board[boardName].Rotation,
      // eslint-disable-next-line react/no-unused-state
      clipPath: board[boardName].ClipPath,
      chosenPin: null
    });
  }

  render() {
    const self = this;
    const { boardName, squares, rotation, clipPath, chosenPin } = self.state;

    const countPins = squares.filter(square => square === ELEMENT_TYPE.PIN)
      .length;
    const hasWinner = countPins === 1;

    const boardNameList = Object.keys(board).map(name => ({
      value: name,
      label: name
    }));
    if (hasWinner) {
      return (
        <div className="App">
          <div className="DivGameLabel">
            <button
              className="Winner"
              onClick={() => self.restart()}
              onKeyDown={() => self.restart()}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <div className="DivGameLabel">
          <Select
            name="form-field-board-label"
            value={this.state.value}
            searchable={false}
            selectValue={this.state.value}
            clearable={false}
            rtl={false}
            onChange={event => self.handleBoardNameChange(event)}
            options={boardNameList}
            placeholder="New Game"
          />
        </div>
        <h1 className="boardNameLabel">{self.state.boardName}</h1>
        <GameTable
          squares={squares}
          chosenPin={chosenPin}
          boardName={boardName}
          rotation={rotation}
          clipPath={clipPath}
          onClick={i => self.handleClick(i)}
        />
      </div>
    );
  }
}

export default Game;

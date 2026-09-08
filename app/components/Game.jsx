import { Component } from 'react';
import BOARDS from '../config/boards';
import GameTable from './GameTable';
import ELEMENT_TYPE from '../config/constants';

const board = BOARDS;

export function getDiagonalMiddlePinPosition(origin, destiny, side) {
  const originRow = Math.floor(origin / side);
  const originColumn = origin % side;
  const destinyRow = Math.floor(destiny / side);
  const destinyColumn = destiny % side;
  const rowDelta = destinyRow - originRow;
  const columnDelta = destinyColumn - originColumn;

  if (Math.abs(rowDelta) !== 2 || Math.abs(columnDelta) !== 2) {
    return null;
  }

  return origin + (rowDelta / 2) * side + columnDelta / 2;
}

class Game extends Component {
  // e: empty / p: pin / c: chosen / h: hole

  constructor(props) {
    super(props);
    this.state = {
      boardName: 'Standard',
      squares: board.Standard.Pins.slice(),
      rotation: board.Standard.Rotation,
      clipPath: board.Standard.ClipPath,
      chosenPin: null,
      history: [],
      boardMenuOpen: false,
      theme: 'dark'
    };
  }

  restart() {
    this.setState({
      boardName: 'Standard',
      squares: board.Standard.Pins.slice(),
      rotation: board.Standard.Rotation,
      clipPath: board.Standard.ClipPath,
      chosenPin: null,
      history: [],
      boardMenuOpen: false
    });
  }

  tryMove(origin, destiny, isDiagAllowed) {
    const numHorizontalPins = Math.sqrt(this.state.squares.length);
    let middlePinPosition;
    const diff = destiny - origin;
    if (
      diff === 2 * numHorizontalPins &&
      this.state.squares[origin + numHorizontalPins] === ELEMENT_TYPE.PIN
    ) {
      middlePinPosition = origin + numHorizontalPins;
    } else if (
      diff === -(2 * numHorizontalPins) &&
      this.state.squares[origin - numHorizontalPins] === ELEMENT_TYPE.PIN
    ) {
      middlePinPosition = origin - numHorizontalPins;
    } else if (
      diff === 2 &&
      this.state.squares[origin + 1] === ELEMENT_TYPE.PIN
    ) {
      middlePinPosition = origin + 1;
    } else if (
      diff === -2 &&
      this.state.squares[origin - 1] === ELEMENT_TYPE.PIN
    ) {
      middlePinPosition = origin - 1;
    } else if (isDiagAllowed) {
      const diagonalMiddlePinPosition = getDiagonalMiddlePinPosition(
        origin,
        destiny,
        numHorizontalPins
      );
      if (
        diagonalMiddlePinPosition !== null &&
        this.state.squares[diagonalMiddlePinPosition] === ELEMENT_TYPE.PIN
      ) {
        middlePinPosition = diagonalMiddlePinPosition;
      } else {
        return false;
      }
    } else {
      return false;
    }

    const lastSquares = this.state.squares.slice();
    lastSquares[middlePinPosition] = 'h';
    lastSquares[origin] = 'h';
    lastSquares[destiny] = ELEMENT_TYPE.PIN;
    const squares = lastSquares.slice();
    const history = [
      ...this.state.history,
      this.state.squares.slice()
    ].slice(-10);
    this.setState({
      chosenPin: null,
      squares,
      history
    });
  }

  undo() {
    const history = this.state.history.slice();
    const squares = history.pop();
    if (!squares) return;
    this.setState({
      chosenPin: null,
      squares,
      history
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

  handleDragStart(i, event) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(i));
    this.setState({ chosenPin: i });
  }

  handleDragEnd() {
    this.setState({ chosenPin: null });
  }

  handleDragOver(i, event) {
    if (this.state.squares[i] === ELEMENT_TYPE.HOLE) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }
  }

  handleDrop(i, event) {
    event.preventDefault();
    const origin = Number(event.dataTransfer.getData('text/plain'));
    if (
      Number.isInteger(origin) &&
      this.state.squares[i] === ELEMENT_TYPE.HOLE &&
      this.state.squares[origin] === ELEMENT_TYPE.PIN
    ) {
      this.tryMove(origin, i, this.state.rotation === 'rotate(45deg)');
    }
    this.setState({ chosenPin: null });
  }

  toggleTheme() {
    this.setState(({ theme }) => ({
      theme: theme === 'dark' ? 'light' : 'dark'
    }));
  }

  handleBoardNameChange(event) {
    const boardName = event.value;
    this.setState({
      boardName,
      squares: board[boardName].Pins.slice(),
      rotation: board[boardName].Rotation,
      clipPath: board[boardName].ClipPath,
      chosenPin: null,
      history: [],
      boardMenuOpen: false
    });
  }

  renderBoardIcon(boardConfig) {
    return (
      <span
        className="BoardIcon"
        style={{ '--board-icon-columns': Math.sqrt(boardConfig.Pins.length) }}
        aria-hidden="true"
      >
        {boardConfig.Pins.map((value, index) => (
          <span
            key={`${value}-${index}`}
            className={`BoardIcon-cell BoardIcon-cell--${value}`}
          />
        ))}
      </span>
    );
  }

  render() {
    const {
      boardName,
      squares,
      rotation,
      clipPath,
      chosenPin,
      history,
      boardMenuOpen,
      theme
    } = this.state;

    const countPins = squares.filter(square => square === ELEMENT_TYPE.PIN)
      .length;
    const hasWinner = countPins === 1;

    if (hasWinner) {
      return (
        <div className={`App App--${theme}`}>
          <div className="DivGameLabel">
            <button
              type="button"
              aria-label="Start a new game"
              className="Winner"
              onClick={() => this.restart()}
            />
            <button
              type="button"
              className="UndoButton UndoButton--winner"
              onClick={() => this.undo()}
              disabled={history.length === 0}
            >
              Undo
            </button>
            <button
              type="button"
              role="switch"
              aria-checked={theme === 'dark'}
              className="ThemeToggle ThemeToggle--winner"
              onClick={() => this.toggleTheme()}
            >
              <span className="ThemeToggleTrack" aria-hidden="true">
                <span className="ThemeToggleThumb" />
              </span>
              {theme === 'dark' ? 'Dark' : 'Light'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={`App App--${theme}`}>
        <div className="DivGameLabel">
          <span className="BoardPickerLabel">New game</span>
          <div className="BoardPicker">
            <button
              type="button"
              className="BoardPickerButton"
              aria-expanded={boardMenuOpen}
              aria-haspopup="listbox"
              onClick={() => this.setState({ boardMenuOpen: !boardMenuOpen })}
            >
              {this.renderBoardIcon(board[boardName])}
              <span>{boardName}</span>
              <span className="BoardPickerChevron" aria-hidden="true">+</span>
            </button>
            {boardMenuOpen && (
              <div className="BoardPickerMenu" role="listbox" aria-label="Choose a board">
                {Object.keys(board).map(name => (
                  <button
                    key={name}
                    type="button"
                    role="option"
                    aria-selected={name === boardName}
                    className="BoardPickerOption"
                    onClick={() => this.handleBoardNameChange({ value: name })}
                  >
                    {this.renderBoardIcon(board[name])}
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            className="UndoButton"
            onClick={() => this.undo()}
            disabled={history.length === 0}
          >
            Undo
          </button>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={theme === 'dark'}
          className="ThemeToggle"
          onClick={() => this.toggleTheme()}
        >
          <span className="ThemeToggleTrack" aria-hidden="true">
            <span className="ThemeToggleThumb" />
          </span>
          {theme === 'dark' ? 'Dark' : 'Light'}
        </button>
        <p className="eyebrow">ONE LEFT</p>
        <h1 className="boardNameLabel">{boardName}</h1>
        <GameTable
          squares={squares}
          chosenPin={chosenPin}
          boardName={boardName}
          rotation={rotation}
          clipPath={clipPath}
          onClick={i => this.handleClick(i)}
          onDragStart={(i, event) => this.handleDragStart(i, event)}
          onDragEnd={() => this.handleDragEnd()}
          onDragOver={(i, event) => this.handleDragOver(i, event)}
          onDrop={(i, event) => this.handleDrop(i, event)}
        />
      </div>
    );
  }
}

export default Game;

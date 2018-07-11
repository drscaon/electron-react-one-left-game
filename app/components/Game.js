import React, { Component } from 'react';
import Select from 'react-select';
import BOARDS from '../config/boards'
//import logo from './logo.svg';
//import './game.css';

function Square(props) {
  if(props.value === 'e'){
    return (
      <button className={'Square'} onClick={props.onClick}>
      </button>
      );
  }

  let cname = '';
  if(props.value === 'p'){
    cname = 'Pin';
    return (
      <button className={'Square'} onClick={props.onClick}>
        <div className={cname} />
      </button>
    );
  }
  else if(props.value === 'c'){
    cname = 'Chosen Pin';
  }
  else if(props.value === 'h'){
    cname = 'Hole';
  }

  return (
    <button className={'Square'} onClick={props.onClick}>
      <div className={cname} />
    </button>
  );
}

// renders the board's matrix (7x7)
class BoardMatrix extends Component {

  renderSquare(i){
    if(i===this.props.chosenPin){
      return (
      <Square
        value={'c'} //chosen
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
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
        </div>
        <div className="board-row">
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
        </div>
        <div className="board-row">
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
        </div>
        <div className="board-row">
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
        </div>
        <div className="board-row">
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
        </div>
        <div className="board-row">
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
          {this.renderSquare(48)}
        </div>
      </div>
    );
  }
}

// renders the board square
function GameTable(props){
  return(
    <div className="Square-board">
      <BoardMatrix
      squares={props.squares} 
      chosenPin={props.chosenPin}
      onClick={props.onClick}
        />
    </div>
  );
}

const board = BOARDS;

class Game extends Component {

  // e: empty / p: pin / c: chosen / h: hole 

  constructor(props) {
    super(props);
    this.state = {
      boardName: 'Standard',
      squares: board.Standard.slice(),
      chosenPin: null
    };
  }

  restart(){
    this.setState({
      boardName: 'Standard',
      squares: board.Standard.slice(),
      chosenPin: null
    });
  }

  tryMove(origin,destiny){
    // has a pin between?
    // +-14 diff (vertical)  [pin = +-7]
    // +-2 diff (horizontal) [pin = +-1]
    let middlePinPosition;
    const diff = destiny-origin;//24-10=14
    if(diff === 14 && this.state.squares[origin+7] ==='p'){ // down
      middlePinPosition = origin+7;
    }
    else if(diff === -14 && this.state.squares[origin-7] ==='p' ) { // up
      middlePinPosition = origin-7;
    }
    else if(diff === 2 && this.state.squares[origin+1] ==='p' ) { // right
      middlePinPosition = origin+1;
    }
    else if(diff === -2 && this.state.squares[origin-1] ==='p') { // left
      middlePinPosition = origin-1;
    }
    else{
      return false;
    }

    let last_squares = this.state.squares;
    last_squares[middlePinPosition]='h';
    last_squares[origin]='h';
    last_squares[destiny]='p';
    const squares = last_squares.slice();
    this.setState({
      chosenPin : null,
      squares : squares
    });
  }
  
  handleClick(i) {
    // Clicked a pin (chosen or not)
    if(this.state.squares[i]==='p' || this.state.squares[i]==='c'){
      this.setState({
        chosenPin : this.state.chosenPin === i ? null : i
      });
    }
    else if(this.state.squares[i]==='h') { // Clicked a hole
      if(this.state.chosenPin) { //evaluate move
        this.tryMove(this.state.chosenPin, i);
      }
    }
    else {
      // Ignore click (empty space)
    }
  }

  handleBoardNameChange(event) {
    console.log('event = ');
    console.log(event);
    const boardName = event.value;
    this.setState({
      boardName: boardName,
      squares: board[boardName].slice(),
      chosenPin: null
    });
  }

  render() {
    const self = this;
    const squares = self.state.squares;
    const chosenPin = self.state.chosenPin;
    const boardNameList= Object.keys(board).map(function(name){
      return ({ value: name, label: name });
    })
    return (
      <div className="App">
        <div className="DivGameLabel">
          <Select  
            name="form-field-board-label"
            value={this.state.value} 
            searchable={false}
            selectValue={this.state.value}
            clearable= {false}
            rtl={false}
            onChange={(event) => self.handleBoardNameChange(event)}
            options={boardNameList}
            placeholder={'New Game'}
            />
        </div>
        <h1 className="boardNameLabel">{self.state.boardName}</h1>
        <GameTable
          squares={squares}
          chosenPin={chosenPin}
          onClick={(i) => self.handleClick(i)}
         />
      </div>
    );
  }
}

export default Game;

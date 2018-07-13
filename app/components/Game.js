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
  renderRow(currentRow,cols){
    let rowItems = []
    for(let j=0;j<cols;j++){
       rowItems.push(this.renderSquare(cols*currentRow + j));
    }
    return (
      <div className="board-row">
        {rowItems}
      </div>
    );
  }

  render() {
    // consider the board as being always a perfect square, so...
    // take n from the length of the board configuration
    const rows = Math.sqrt(this.props.squares.length); // totalLen=49, n=7
    const cols = rows;
    let response = [];
    for(let i=0;i<rows;i++){
      response.push(this.renderRow(i,cols));
    }

    return (
      <div>
        {response}
      </div>
    );
  }
}

// renders the board square
function GameTable(props){
  const rotation = props.rotation; //props.boardName==='English Triangle'?  'rotate(45deg)' : 'rotate(0deg)' ;
  const clipPath = props.clipPath;//props.boardName==='English Triangle'? 'polygon(0% 0%, 112% 0%, 0% 112%)' : null;
  const rows = Math.sqrt(props.squares.length); // totalLen=49, n=7
  return(
    <div className='ShadowContainer'>
      <div className="Square-board" style={{width : 40*rows, height : 40*rows, transform:rotation, clipPath:clipPath}}>
        <BoardMatrix
        squares={props.squares} 
        chosenPin={props.chosenPin}
        onClick={props.onClick}
          />
      </div>
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
      squares: board.Standard.Pins.slice(),
      rotation: board.Standard.Rotation,
      clipPath: board.Standard.ClipPath,
      chosenPin: null
    };
  }

  restart(){
    this.setState({
      boardName: 'Standard',
      squares: board.Standard.Pins.slice(),
      rotation: board.Standard.Rotation,
      clipPath: board.Standard.ClipPath,
      chosenPin: null
    });
  }

  tryMove(origin,destiny){
    // has a pin between?
    // +-14 diff (vertical)  [pin = +-7]
    // +-2 diff (horizontal) [pin = +-1]

    const numHorizontalPins = Math.sqrt(this.state.squares.length);

    let middlePinPosition;
    const diff = destiny-origin;//24-10=14
    if(diff === (2*numHorizontalPins) && this.state.squares[origin+numHorizontalPins] ==='p'){ // down
      middlePinPosition = origin+numHorizontalPins;
    }
    else if(diff === -(2*numHorizontalPins) && this.state.squares[origin-numHorizontalPins] ==='p' ) { // up
      middlePinPosition = origin-numHorizontalPins;
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
      squares: board[boardName].Pins.slice(),
      rotation: board[boardName].Rotation,
      clipPath: board[boardName].ClipPath,
      chosenPin: null
    });
  }

  render() {
    const self = this;
    const squares = self.state.squares;
    const chosenPin = self.state.chosenPin;
    const boardName = self.state.boardName;
    const rotation = self.state.rotation;
    const clipPath = self.state.clipPath;

    const countPins = squares.filter(function(square){
      return square === 'p';
    }).length;
    const hasWinner = (countPins===1);
    
    const boardNameList= Object.keys(board).map(function(name){
      return ({ value: name, label: name });
    })
    if(hasWinner){
      return (
        <div className="App">
          <div className="DivGameLabel">
           <div className='Winner' onClick={() => self.restart()}/>
          </div>
        </div>
      )
    }
    else{
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
            boardName={boardName}
            rotation={rotation}
            clipPath={clipPath}
            onClick={(i) => self.handleClick(i)}
           />
        </div>
      );
    }
    
  }
}

export default Game;

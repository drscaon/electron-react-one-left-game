import React from 'react';
import PropTypes from 'prop-types';
import BoardMatrix from './BoardMatrix';

// renders the board square
function GameTable(props) {
  const { rotation, clipPath } = props;
  const rows = Math.sqrt(props.squares.length); // totalLen=49, n=7
  return (
    <div className="ShadowContainer">
      <div
        className="Square-board"
        style={{
          width: 40 * rows,
          height: 40 * rows,
          transform: rotation,
          clipPath
        }}
      >
        <BoardMatrix
          squares={props.squares}
          chosenPin={props.chosenPin}
          onClick={props.onClick}
          isDiagAllowed={props.rotation === 'rotate(45deg)'}
        />
      </div>
    </div>
  );
}

GameTable.propTypes = {
  rotation: PropTypes.string.isRequired,
  clipPath: PropTypes.string.isRequired,
  squares: PropTypes.string.isRequired,
  chosenPin: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default GameTable;

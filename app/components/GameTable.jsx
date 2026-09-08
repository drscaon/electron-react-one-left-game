import PropTypes from 'prop-types';
import BoardMatrix from './BoardMatrix';

// renders the board square
function GameTable(props) {
  const { rotation, clipPath } = props;
  const rows = Math.sqrt(props.squares.length); // totalLen=49, n=7
  return (
    <div className="ShadowContainer">
      <div
        className={`Square-board${rotation === 'rotate(45deg)' ? ' Square-board--rotated' : ''}`}
        style={{
          '--board-columns': rows,
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
          onDragStart={props.onDragStart}
          onDragEnd={props.onDragEnd}
          onDragOver={props.onDragOver}
          onDrop={props.onDrop}
          isDiagAllowed={props.rotation === 'rotate(45deg)'}
        />
      </div>
    </div>
  );
}

GameTable.propTypes = {
  rotation: PropTypes.string.isRequired,
  clipPath: PropTypes.string,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  chosenPin: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default GameTable;

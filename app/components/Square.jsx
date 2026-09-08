import PropTypes from 'prop-types';
import ELEMENT_TYPE from '../config/constants';

function Square(props) {
  if (props.value === 'e') {
    return <button className="Square" onClick={props.onClick} />;
  }
  let cname = '';
  if (props.value === ELEMENT_TYPE.PIN) {
    cname = 'Pin';
    return (
      <button
        className="Square"
        draggable
        onClick={props.onClick}
        onDragStart={props.onDragStart}
        onDragEnd={props.onDragEnd}
      >
        <div className={cname} />
      </button>
    );
  } else if (props.value === ELEMENT_TYPE.CHOSEN) {
    cname = 'Chosen Pin';
  } else if (props.value === ELEMENT_TYPE.HOLE) {
    cname = 'Hole';
  }
  return (
    <button
      className="Square"
      onClick={props.onClick}
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
    >
      <div className={cname} />
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func
};

export default Square;

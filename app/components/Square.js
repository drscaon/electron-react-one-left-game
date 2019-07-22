import React from 'react';
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
      <button className="Square" onClick={props.onClick}>
        <div className={cname} />
      </button>
    );
  } else if (props.value === ELEMENT_TYPE.CHOSEN) {
    cname = 'Chosen Pin';
  } else if (props.value === ELEMENT_TYPE.HOLE) {
    cname = 'Hole';
  }
  return (
    <button className="Square" onClick={props.onClick}>
      <div className={cname} />
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Square;

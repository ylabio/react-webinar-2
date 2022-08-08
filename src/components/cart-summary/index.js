import React from 'react';
import PropTypes from 'prop-types';
import './style.css'


const Summary = (props) => {
  return (
    <div className="summary">
      <p className='summary-title'>Итого</p>
      <p className='summary-value'>{props.sum.toLocaleString()} ₽</p>
    </div>
  );
};

Summary.propTypes = {
  sum: PropTypes.number.isRequired,
};

export default React.memo(Summary);
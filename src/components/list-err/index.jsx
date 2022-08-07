import React from 'react';
import propTypes from 'prop-types';
import './style.css';

const ListErr = ({ message }) => {
  return (<p className='list-err'>{ message }</p>)
};

ListErr.propTypes = {
  message: propTypes.string
};

ListErr.defaultProps = {
  message: 'Список пуст'
};

export default React.memo(ListErr);
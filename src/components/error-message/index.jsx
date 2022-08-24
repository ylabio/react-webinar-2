import React from 'react';
import propTypes from "prop-types";
import './style.css';

const ErrorMessage = ({ title, message }) => {
  return (
    <div className='error-message'>
      <h1>{title}</h1>
      <h2>{message}</h2>
    </div>
  )
}

ErrorMessage.propTypes = {
  title: propTypes.string,
  messag: propTypes.string,
};

ErrorMessage.defaultProps = {
  title: 'Ошибка',
  message: 'Проверьте консоль',
};

export default React.memo(ErrorMessage);
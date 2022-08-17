import React from 'react';
import './style.css';

const Error = () => {
  return (
    <div className='error'>
      <p className='error__title'>Что-то пошло не так</p>
      <p>Проверьте консоль</p>
    </div>
  )
};

export default React.memo(Error);
import React from 'react';
import './style.css';

function Language(props) {
  return (
    <div className='language'>
      <div onClick={props.ru} className='button'>
        РУССКИЙ
      </div>
      <div onClick={props.eng} className='button'>
        ENGLISH
      </div>
    </div>
  );
}

export default React.memo(Language);

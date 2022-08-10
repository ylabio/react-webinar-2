import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Mymodal ({children, visible, setvisible}) {
  const myModalClassName = ['myModal'];
  if (visible) {
    myModalClassName.push('myModal-active');
  }

  return (
    <div className={myModalClassName.join(' ')} onClick={() => setvisible(false)}>
      <div className='myModalContent' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

Mymodal.propTypes = {
  children: propTypes.node,
};

export default Mymodal;
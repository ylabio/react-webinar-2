import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LayoutModal({close, children}) {

  return (
    <div className='Modal-wrapper'>
      <div className='Modal-container'>
        <div className='overlay' onClick={close}></div>
        <div className='Modal'>
            {children}
        </div>
    </div>
    </div>
  )
}

LayoutModal.propTypes = {
  close: propTypes.func,
  children: propTypes.node
}

LayoutModal.defaultProps = {
  close: () => {}
}

export default React.memo(LayoutModal);

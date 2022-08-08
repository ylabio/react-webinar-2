import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LayoutModal({close, children}) {
  const cn = bem('Modal');

  return (
    <>
      <div className={cn('overlay')} onClick={close}></div>
      <div className={cn()}>
        {children}
      </div>
    </>
  )
}

LayoutModal.propTypes = {
  close: propTypes.func.isRequired
}

LayoutModal.defaultProps = {
  close: () => {}
}

export default React.memo(LayoutModal);

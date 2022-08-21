import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LayoutForm({title, children, onSubmit, onSubmitText}) {

  const cn = bem('LayoutForm');

  const callbacks = {
    eventPreventDefault: useCallback((event) => event.preventDefault(), [])
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>{title}</div>
      <form className={cn('form')} onSubmit={callbacks.eventPreventDefault}>
        {children}
        <button onClick={onSubmit}>{onSubmitText}</button>
      </form>
    </div>
  )
}

LayoutForm.propTypes = {
}

LayoutForm.defaultProps = {
}

export default React.memo(LayoutForm);

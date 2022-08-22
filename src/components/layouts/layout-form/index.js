import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LayoutForm({title, children, onSubmit, onSubmitText}) {

  // CSS классы по БЭМ
  const cn = bem('LayoutForm');

  const callbacks = {
    // Отмена действия браузера по умолчанию
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
  title: propTypes.string,
  children: propTypes.node,
  onSubmit: propTypes.func,
  onSubmitText: propTypes.string
}

LayoutForm.defaultProps = {
  title: '',
  children: '',
  onSubmit: () => {},
  onSubmitText: ''
}

export default React.memo(LayoutForm);

import { cn as bem} from '@bem-react/classname';
import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import 'style.css';

function LayoutForm({onSubmit, submitText, title, err, children}) {
  const cn = bem('LayoutForm')

  const callbacks = {
    prevent: useCallback((e) => e.preventDefault(), [])
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {title}
      </div>
      <div className={cn('content')}>
        <form onSubmit={callbacks.prevent}>
          {children}
          {err}
          <button onClick={onSubmit}>{submitText}</button>
        </form>
      </div>
    </div>
  )
}

LayoutForm.propTypes = {
  onSubmit: propTypes.func,
  submitText: propTypes.string,
  title: propTypes.node,
  err: propTypes.node,
  children: propTypes.node
}

LayoutForm.defaultProps = {
  
}

export default React.memo(LayoutForm);
import { cn } from '@bem-react/classname'
import React, { useCallback } from 'react'
import './styles.css'
import propTypes from 'prop-types'

function LayoutForm({onSubmit, submitText, title, err, children}) {
  const bem = cn('LayoutForm')

  const callbacks = {
    prevent: useCallback((e) => e.preventDefault(), [])
  }

  return (
    <div className={bem()}>
      <div className={bem('title')}>
        {title}
      </div>
      <div className={bem('content')}>
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
  onSubmit: () => {},
  submitText: 'submit',
  title: <h2>form</h2>
}

export default React.memo(LayoutForm)
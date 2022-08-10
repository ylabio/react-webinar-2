import { cn as bem } from '@bem-react/classname'
import propTypes from 'prop-types'
import React, { useCallback } from 'react'
import './style.css'

function Popup({ children, header, onClose }) {
  const cn = bem('Popup')

  const callbacks = {
    onClose: useCallback(() => {
      onClose()
    }, [])
  }

  return (
    <div className={'Overflow'}>
      <div className={cn()}>
        <div className={cn('head')}>
          <h1>{header}</h1>
          <button onClick={callbacks.onClose}>Закрыть</button>
        </div>
        <div className={cn('content')}>{children}</div>
      </div>
    </div>
  )
}

Popup.propTypes = {
  header: propTypes.string,
  children: propTypes.node.isRequired,
  onClose: propTypes.func.isRequired
}

export default React.memo(Popup)

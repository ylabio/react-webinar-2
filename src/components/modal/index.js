import React from 'react'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import propTypes from 'prop-types'

function Modal({ activeModal, children }) {
  const cn = bem('Modal')

  return (
    <div className={cn({ active: activeModal })}>
      <div className={cn('content', { active: activeModal })}>{children}</div>
    </div>
  )
}

Modal.propTypes = {
  setActiveModal: propTypes.func.isRequired,
  activeModal: propTypes.bool.isRequired,
  children: propTypes.node,
}

Modal.defaultProps = {
  setActiveModal: () => {},
}

export default React.memo(Modal)

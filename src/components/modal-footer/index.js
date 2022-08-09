import React from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function ModalFooter(props) {
  const cn = bem('ModalFooter')

  return (
    <div className={cn()}>
      <span className={cn('text')}>Итого: </span>
      <span className={cn('sum')}>{props.sum + ' ₽'}</span>
    </div>
  )
}

ModalFooter.propTypes = {
  sum: propTypes.number,
}

ModalFooter.defaultProps = {}

export default React.memo(ModalFooter)

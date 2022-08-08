import React from 'react'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import propTypes from 'prop-types'

function Header({ title, button }) {
  const cn = bem('Header')

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{title}</h1>
      <div className={cn('button')}>{button}</div>
    </div>
  )
}

Header.propTypes = {
  title: propTypes.string,
  button: propTypes.node,
}

Header.defaultProps = {}

export default React.memo(Header)

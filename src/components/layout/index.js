import { cn as bem } from '@bem-react/classname'
import propTypes from 'prop-types'
import React from 'react'
import './style.css'

function Layout({ head, children, baseClassName }) {
  const cn = bem(baseClassName)

  return (
    <div className={cn()}>
      <div className={cn('head')}>{head}</div>
      <div className={cn('content')}>{children}</div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  baseClassName: propTypes.string
}

Layout.defaultProps = {
  baseClassName: 'Layout'
}

export default React.memo(Layout)

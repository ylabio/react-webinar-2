import { cn as bem } from '@bem-react/classname'
import propTypes from 'prop-types'
import React, { useEffect } from 'react'
import './style.css'

function Layout({ head, children, baseClassName, scrollable }) {
  const cn = bem(baseClassName)

  useEffect(() => {
    document.body.style.overflow = scrollable ? 'auto' : 'hidden'
  }, [scrollable])

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
  baseClassName: propTypes.string,
  scrollable: propTypes.bool
}

Layout.defaultProps = {
  baseClassName: 'Layout'
}

export default React.memo(Layout)

import { cn as bem } from '@bem-react/classname'
import propTypes from 'prop-types'
import React, { useCallback } from 'react'
import Layout from '../layout'
import './style.css'

function Popup({ children, header, onClose }) {
  const cn = bem('Overflow')

  const callbacks = {
    onClose: useCallback(() => {
      onClose()
    }, [])
  }

  return (
    <div className={cn()}>
      <Layout
        baseClassName='Popup'
        head={
          <>
            <h1>{header}</h1>
            <button onClick={callbacks.onClose}>Закрыть</button>
          </>
        }
      >
        {children}
      </Layout>
    </div>
  )
}

Popup.propTypes = {
  header: propTypes.string,
  children: propTypes.node.isRequired,
  onClose: propTypes.func.isRequired
}

export default React.memo(Popup)

import React, { useCallback, useEffect } from 'react'
import "./style.css"
import { cn as bem } from '@bem-react/classname'
import propTypes from 'prop-types';

function Modal({
  handleClose, 
  children
}) {
  const cn = bem("Modal")

  // Это удобно (и круто, никогда так не делал, но мне нравилось, когда так делали на других сайтах)
  // Позволяет по Esc сбрасывать модальник
  useEffect(() => {
    if (typeof window !== 'undefined') {  
      function keydown(e) {
        if (e.key === "Escape") handleClose() // Это всё равно используется только на первый рендер, нет смысла от заюсколбеченного
      }
      window.addEventListener('keydown', keydown)
      return () => {
        window.removeEventListener('keydown', keydown)
      }
    }
  }, [])

  const callbacks = {
    closeModal: useCallback(() => {
      handleClose()
    }, [handleClose]),
  }

  return (
    <div className={cn()}
         onClick={callbacks.closeModal}> 
         {/* 
          Это тоже удобно, но я так уже делал)
          Позволяет по клику вне модальника сбрасывать модальник
         */}
        {children}
    </div>
  )
}

Modal.propTypes = {
  handleClose: propTypes.func.isRequired, 
  children: propTypes.element.isRequired
}

Modal.defaultProps = {
}

export default React.memo(Modal)
import React from 'react'
import styles from './style.module.css'

const Modal = React.memo(({ children }) => {
  return <div className={styles.modal}>{children}</div>
})

export default Modal

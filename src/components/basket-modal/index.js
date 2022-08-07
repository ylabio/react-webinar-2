import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import List from '../list'
import styles from './style.module.css'
import { calculateSumOfItems } from '../../utils'

const BasketModal = ({ items, onCloseTab, usingFunc }) => {
  const [sum, setSum] = useState()

  useEffect(() => {
    setSum(calculateSumOfItems(items))
  }, [items])

  return (
    <div className={styles.basket}>
      <div className={styles.basket__header}>
        <h1 className={styles.basket__title}>Корзина</h1>
        <button onClick={onCloseTab}>Закрыть</button>
      </div>
      <div className={styles.basket__body}>
        {items ? <List items={items} usingFunc={usingFunc} action={'Удалить'} /> : null}
      </div>
      <div className={styles.basket__footer}>
        <div className={styles.basket__total}>Итого</div>
        <div className={styles.basket__total}>{sum} ₽</div>
      </div>
    </div>
  )
}

BasketModal.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onCloseTab: propTypes.func.isRequired,
  usingFunc: propTypes.func.isRequired
}

BasketModal.defaultProps = {
  items: [],
  onCloseTab: () => {},
  usingFunc: () => {}
}

export default BasketModal

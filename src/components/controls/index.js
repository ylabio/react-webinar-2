import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import styles from './style.module.css'
import { calculateQuantityOfItems, calculateSumOfItems } from '../../utils'

const Controls = ({ basket, openTab }) => {
  const [sum, setSum] = useState()
  const [quantity, setQuantity] = useState()

  useEffect(() => {
    setSum(calculateSumOfItems(basket))
    setQuantity(calculateQuantityOfItems(basket))
  }, [basket, setSum, setQuantity, calculateSumOfItems, calculateQuantityOfItems])

  return (
    <div className={styles.controls}>
      <div className={styles.controls__quantity}>
        <div>В корзине: </div>
        {basket.length > 0 ? (
          <div className={styles.controls__price}>{`${quantity} товаров / ${sum} ₽`}</div>
        ) : (
          <div className={styles.controls__price}>пусто</div>
        )}
      </div>
      <button onClick={openTab}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  basket: propTypes.array.isRequired,
  openTab: propTypes.func.isRequired
}

Controls.defaultProps = {
  basket: [],
  openTab: () => {}
}

export default Controls

import React, { useState } from 'react';
import propTypes from 'prop-types';
import './style.css';
import Modal from '../modal/modal';
import { cn as bem } from "@bem-react/classname";
import BasketList from './basket-list/basket-list'

function Controls(props) {
  const cn = bem('Basket');
  const [modalActive, setModalActive] = useState(false)
  const plural = require('plural-ru');

  let list = props.itemsBasket.map(pos =>
    <div key={pos.code} className={cn('item')}>
      <BasketList code={pos.code}
                  title={pos.title}
                  price={pos.price}
                  amount={pos.amount}
                  priceFormation={props.priceFormation}
                  onDeleteItems={props.onDeleteItems} />
    </div>)

  return (
    <div className={cn('')}>
      <span className={cn('control')}> В корзине: <span className={cn('makeBold')}>
        {props.counterBasketItemsAmount > 0 ?
          ` ${props.counterBasketItemsAmount} ${plural(props.counterBasketItemsAmount, 'товар', 'товара', 'товаров')} / ${props.priceFormation(props.counterBasketItemsSumm)} ₽` :
          ` пусто`}
      </span>
      </span>
      <button onClick={() => setModalActive(true)}>Перейти</button>

      <Modal active={modalActive} setAtive={setModalActive}>
        <div className={cn('header_modal')}>
          <h2 className={cn('modal-h2')}>Корзина</h2>
          <button onClick={() => setModalActive(false)}>Закрыть</button>
        </div>
        {list}

        {props.counterBasketItemsAmount > 0 ?
          <div className={cn('total-summa')}>
            <span className={cn('total')} >Итого:</span><span className={cn('summa')}>{props.priceFormation(props.counterBasketItemsSumm)} ₽</span>
          </div> :
          <span className={cn('is-empty')} >Корзина пуста</span>
        }

      </Modal>
    </div>
  )
}

Controls.propTypes = {
  priceFormation: propTypes.func.isRequired,
  onDeleteItems: propTypes.func.isRequired,
  counterBasketItemsAmount: propTypes.number.isRequired,
  counterBasketItemsSumm: propTypes.number.isRequired,
}

Controls.defaultProps = {
  priceFormation: () => { },
  onDeleteItems: () => { },
}

export default React.memo(Controls);

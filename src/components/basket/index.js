import React, { useState } from 'react';
import propTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import Modal from '../modal';
import List from '../list';
import plural from 'plural-ru';
import { getFormattedPrice } from '../../utils';


function Basket({ cart, items, deleteItem }) {
  const cn = bem('Basket');

  const [modalActive, setModalActive] = useState(false);
  
  console.log(cart);

  return (
    <div className={cn()}>
      <div className={cn('title')}>В корзине: </div>
      <div className={cn('quantity')}>
        {cart.items.length > 0
          ? `${cart.items.length} ${plural(cart.items.length, 'товар', 'товара', 'товаров')} / ${
              getFormattedPrice(cart.summ)
            }`
          : 'пусто'}
      </div>
      <button className={cn('button')} onClick={() => setModalActive(true)}>
        Перейти
      </button>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className={cn('modal')}>
          <div className={cn('modal_header')}>
            <div className={cn('header_title')}>Корзина</div>
            <button onClick={() => setModalActive(false)} className={cn('header_button')}>
              Закрыть
            </button>
          </div>
          <div className={cart.items.length ? '' : cn('content_empty')}>
            {cart.items.length > 0 ? (
              <List cart={cart} items={items} deleteItem={deleteItem} />
            ) : (
              'Здесь пока что пусто :)'
            )}
          </div>
        </div>
        {cart.items.length > 0 && (
          <div className={cn('summ')}>
            <div className={cn('total')}>Итого:</div> {`${getFormattedPrice(cart.summ)}`}
          </div>
        )}
      </Modal>
    </div>
  );
}

Basket.propTypes = {
  deleteItem: propTypes.func.isRequired, // Обязательное свойство - функция
  cart: propTypes.object.isRequired,
  items: propTypes.arrayOf(propTypes.object).isRequired,
};

Basket.defaultProps = {
  deleteItem: () => {}, // Значение по умолчанию - функция-заглушка
  cart: {},
  items: [],
};

export default React.memo(Basket);

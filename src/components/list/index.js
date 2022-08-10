import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';
import Controls from '../controls';
import plural from 'plural-ru';

function List({ items, cart, onAdd, calcCost, setModalActive }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        В корзине:
        <span>
          {cart.length ? `${cart.length} ${plural(cart.length, 'товар', 'товара', 'товаров')} / ${calcCost()} ₽` : `пусто`}
        </span>
        <Controls text={"Перейти"} action={() => setModalActive(true)} />
      </div>
      <div className={cn('wrapper')}>{items.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} butAction={onAdd} butText={"Добавить"} />
        </div>
      )}
      </div>
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  cart: propTypes.array.isRequired,
  onAdd: propTypes.func.isRequired,
  calcCost: propTypes.func.isRequired,
  setModalActive: propTypes.func.isRequired
}

export default React.memo(List);

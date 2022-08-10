import React from "react";
import Item from "../item";
import './style.css'
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';

const TEXT_BUTTON_DELETE = 'удалить'

function Basket({visible, closeBasket, items, onItemDelete, sum}) {
  const cn = bem('Basket');

  return (<div className={cn('block')} style={{display: visible ? "flex" : 'none'}}>
    <div className={cn()}>
      <div className={cn('title')}>Корзина</div>
      <button className={cn('buttonClose')} onClick={closeBasket}>Закрыть</button>
      <div>{items.map((item, i) =>
        <div key={item.code} className={cn('item')}>
          <Item onCLickButton={onItemDelete} code={item.code} price={item.price} title={item.title}
                titleButton={TEXT_BUTTON_DELETE} count={item.count} place={i + 1}/>
        </div>
        )}</div>
      <div className={cn('results')}>Итого <p>{sum.toLocaleString('ru')} ₽</p></div>
    </div>
  </div>)

}
Basket.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  visible:propTypes.bool,
  sum:propTypes.number,
  closeBasket:propTypes.func,
  onItemDelete: propTypes.func
}

Basket.defaultProps = {
  items: [],
  visible: false,
  sum:0
}

export default React.memo(Basket)
import React from "react";
import Item from "../../../../../Downloads/Новая папка/src/components/item";
import './style.css'

function Basket({visible, closeBasket, items, onItemDelete}) {
  return (<div className={'Basket-block'} style={{display: visible ? "flex" : 'none'}}>
    <div className='Basket'>
      <div className='Basket-title'>Корзина</div>
      <button className='Basket-buttonClose' onClick={closeBasket}>Закрыть</button>
      <div>{items.map(el => <Item onCLickButton={onItemDelete} code={el.code} price={el.price} title={el.title}
                                  titleButton='удалить' counter={el.counter}/>)}</div>
      <div className="Basket-results">Итого</div>
    </div>
  </div>)

}

export default React.memo(Basket)
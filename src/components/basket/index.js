import React from "react";
import BasketItem from "../basket-item";
import propTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";


function Basket (props) {
    const {items, sumPrice, numberOfPositions, onItemDelete} = props;
    const cn = bem('Basket');
 return (
     <>
         <div className={cn('list')}>
             {items.map(item => {
                     const order = items.indexOf(item) + 1;
                     return (
                         <div key={item.code} className={cn('item')}>
                             <BasketItem
                                 item={item}
                                 onDelete={onItemDelete}
                                 order={order}
                             />
                         </div>
                     )
                 }

             )}
         </div>
         <p className={cn('is-empty')}>{numberOfPositions < 1 ? 'Корзина пуста' : ''}</p>
         <p className={cn('sum')}><span className={cn('sum-text')}>Итого</span> <span className={cn('sum-price')}> {sumPrice + ' ₽'} </span></p>
     </>
 )
}

Basket.propTypes = {
    items: propTypes.arrayOf(propTypes.object).isRequired,
    onItemDelete: propTypes.func.isRequired,
    sumPrice: propTypes.string.isRequired,
    numberOfPositions: propTypes.number.isRequired,
}

export default React.memo(Basket);
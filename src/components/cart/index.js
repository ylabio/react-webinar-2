import React from "react";
import List from "../list";
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import "./style.css"

function Cart({items , deleteItem , cartCost}){

    const cn = bem('Cart');

    return(
        <div className={cn()}>
        {!items.length &&
            <p className={cn('void-message')}>Корзина пуста ! ...</p> || 
            <List items={items}
                  onItemAction={deleteItem}
                  btnTxt ={'Удалить'}
                 />
            }
            <div className={cn('footer')}>
             <p>Итого</p>
             <p>{cartCost.toLocaleString('ru-RU') + " ₽"}</p>
            </div>
        </div>
    )
}

Cart.propTypes = {
    items: propTypes.arrayOf(propTypes.object).isRequired,
    deleteItem: propTypes.func.isRequired,
    cartCost: propTypes.number.isRequired
  }

export default React.memo(Cart);
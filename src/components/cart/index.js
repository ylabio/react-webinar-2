import React, { useCallback } from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CartList from '../cart-list';
import CartFooter from '../cart-footer';


function Cart(props) {

  const cn = bem('Cart');

  return (
      <div >
          {(props.items.length !== 0) 
          ? <div className={cn('content')}>
              <CartList items={props.items}
                    onDeleteItems={props.onDeleteItems}
              />
            </div>
          : <div className={cn('empty')}>
              <h1>Корзина пуста</h1>
            </div>
          }
        <div>
          <CartFooter items={props.items} 
                      totalPrice={props.totalPrice}/>
        </div>
      </div>
  );
}



export default React.memo(Cart);

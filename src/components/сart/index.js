import React, {useCallback, useState} from 'react';
// import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import List from "../list";
import Modal from "../modal";
import './style.css';

function Cart(props) {
  
  const cn = bem('Cart');

  return (
    <Modal head={props.head}
        setVisibility={props.setVisibility}>
      <List items={props.cart}
            isCart={true}
            onButton={props.onButton}
            buttonText={'Удалить'}/>
      <div className={props.cartInfo.itemsCount ? cn('bottomText') : cn('bottomText_hidden')}>
        <div className={cn('bottomTextSum')}>Итого</div>
        <div className={cn('bottomTextData')}>{props.cartInfo.cartSum.toLocaleString('ru-RU')} ₽</div>
      </div>
      <div className={!props.cartInfo.itemsCount ? cn('emptyCartMessage') : cn('emptyCartMessage_hidden')}>В корзине пока ничего нет, но вы можете это исправить :)</div>
     </Modal>
  )
}


export default React.memo(Cart);

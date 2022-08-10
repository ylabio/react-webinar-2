import React, {useCallback, useState} from 'react';
// import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Layout from "../layout";
import Controls from "../controls";
import List from "../list";
import Item from "../item";
import Modal from "../modal";
import './style.css';

function Cart(props) {
  
  const cn = bem('Cart');

  return (
    <Modal head={props.head}
        setVisibility={props.setVisibility}>
      <List items={props.cart}
            onButton={props.onButton}
            buttonText={'Удалить'}/>
      <div className={props.cartSum ? cn('bottomText') : cn('bottomText_hidden')}>
        <div className={cn('bottomTextSum')}>Итого</div>
        <div className={cn('bottomTextData')}>{props.cartSum.toLocaleString('ru-RU')} ₽</div>
      </div>
      <div className={!props.cartSum ? cn('emptyCartMessage') : cn('emptyCartMessage_hidden')}>В корзине пока ничего нет, но вы можете это исправить :)</div>
     </Modal>
  )
}


export default React.memo(Cart);

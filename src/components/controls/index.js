import React, {useState,useEffect} from 'react';
import propTypes from 'prop-types';
import './style.css';
import Modal from '../modal'
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import {spaceInPrice} from "../../utils";


function Controls(props){
  const cn = bem('Controls');

  const [openedModal, setOpenedModal]=useState(false);

  function openModal() {
    setOpenedModal(true)
  }
  function closeModal() {
    setOpenedModal(false)
  }

  let result=0;
  function totalPrice() {
    for (let key in props.cart) {
      result += props.cart[key].price * props.cart[key].counter;
    }
    return result;
  }
  useEffect(()=>{totalPrice()},[props.cart]);

  return (
    <div className={cn()}>
      В корзине: {!props.cart.length
        ?
        <p className={cn('total')}> пусто</p>
        :
        <p className={cn('total')}>
          {props.cart.length} {plural(props.cart.length, 'товар', 'товара', 'товаров')} / {spaceInPrice(totalPrice()) + " "+"₽"}
        </p>}
      <div className={cn('actions')}>
        <button onClick={openModal}>Перейти</button>
      </div>
      {openedModal &&
        <Modal
          cart={props.cart}
          closeModal={closeModal}
          openedModal={openedModal}
          result={result}
          onItemDelete={props.onItemDelete}
        />
      }
    </div>
  )
}

Controls.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDelete: propTypes.func.isRequired,
};

Controls.defaultProps = {
  cart: [],
  onItemDelete: () => {}
};

export default React.memo(Controls);

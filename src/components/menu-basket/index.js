import React from 'react';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import propTypes from 'prop-types';
import Menu from '../menu';
import BasketSimple from "../basket-simple";

function MenuBasket(props) {
  const cn = bem('MenuBasket');

  return (
    <div className={cn()}>
      <Menu />
      <BasketSimple onOpen={props.openModal} amount={props.items.amount} sum={props.items.sum} />
    </div>
  )
}

MenuBasket.propTypes = {
  items: propTypes.object.isRequired,
  openModal: propTypes.func
}

MenuBasket.defaultProps = {
  openModal: () => { }
}

export default React.memo(MenuBasket)

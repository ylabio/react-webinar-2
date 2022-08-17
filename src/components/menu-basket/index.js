import React from 'react';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import propTypes from 'prop-types';
import Menu from '../menu';
import BasketSimple from "../basket-simple";

function MenuBasket({ openModal, amount, sum, lang }) {
  const cn = bem('MenuBasket');

  return (
    <div className={cn()}>
      <Menu lang={lang} />
      <BasketSimple onOpen={openModal} amount={amount} sum={sum} lang={lang} />
    </div>
  )
}

MenuBasket.propTypes = {
  amount: propTypes.number.isRequired,
  sum: propTypes.number.isRequired,
  lang: propTypes.string.isRequired,
  openModal: propTypes.func,
}

MenuBasket.defaultProps = {
  openModal: () => { }
}

export default React.memo(MenuBasket)

import React from 'react';
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import BasketSimple from '../basket-simple';
import MenuLink from '../Menu-link';

 function Menu({ sum, amount, onOpen }) {
  const cn = bem("Menu");
  return (
    <div className={cn()}>
      <MenuLink />
      <BasketSimple 
        onOpen={onOpen}
        amount={amount}
        sum={sum}
      />

    </div>
  )
}
export default React.memo(Menu);

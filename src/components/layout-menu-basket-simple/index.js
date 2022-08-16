import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutMenuBasketSimple({menu, basketSimple}){
  const cn = bem('LayoutHeader');

  return (
    <div className={cn()}>
      <div className={cn('menu')}>{menu}</div>
      <div className={cn('basket-simple')}>{basketSimple}</div>
    </div>
  )
}

LayoutMenuBasketSimple.propTypes = {
  menu: propTypes.node,
  basketSimple: propTypes.node
}

export default React.memo(LayoutMenuBasketSimple);

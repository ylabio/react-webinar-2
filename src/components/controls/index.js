import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {toRubPrice} from "../../utils";
import plural from "plural-ru";

function Controls({cartTotalPrice, cartUniqItemAmount, toggleModalShow}) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn("description")}>
        В корзине:
        <strong className={cn("description-strong")}>
          {!cartUniqItemAmount
            ? 'пусто'
            : `${plural(cartUniqItemAmount,"%d товар","%d товара","%d товаров")} / ${toRubPrice(cartTotalPrice)}`}
        </strong>
      </div>
      <button onClick={toggleModalShow}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  toggleModalShow: propTypes.func,
  cartTotalPrice: propTypes.number,
  cartUniqItemAmount: propTypes.number
}

Controls.defaultProps = {
  toggleModalShow: () => {},
  cartTotalPrice: 0,
  cartUniqItemAmount: 0
}

export default React.memo(Controls);

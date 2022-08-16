import React from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./styles.css";
import plural from "plural-ru";

function BasketSimple({sum, amount, onOpen, getTranslation}) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
      <div className={cn('right')}>
        <span className={cn('label')}>{getTranslation('basketSimple') || 'В корзине:'}</span>
        <span className={cn('total')}>
          {amount ?
            `${amount} ${getTranslation('piece')(amount) || plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽` :
            getTranslation('empty') || 'пусто'}</span>
        <button className={cn('button')} onClick={onOpen}>{getTranslation('open') || 'Перейти'}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  getTranslation: propTypes.func.isRequired,
}

BasketSimple.defaultProps = {
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);

import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';
import TranslateText from '../translate-text';


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <div className={cn('right')}>
				<span className={cn('label')}><TranslateText tid="inTheBasket" />:</span>
				<span className={cn('total')}>
				{amount
					? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
					: <TranslateText tid="empty" />
				}
				</span>
				<button className='BasketSimple__button' onClick={onOpen}>Перейти</button>
			</div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);

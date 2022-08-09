import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';
import {formatPrice} from '../../utils';

function Controls({onToggleModal, totalCount, totalPrice}){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
			<div className={cn('total')}>
				В корзине:<strong>{totalCount ? `${totalCount} ${plural(totalCount, 'товар', 'товара', 'товаров')} / ${formatPrice(totalPrice)} ₽` : 'пусто'}</strong>
			</div>
      <button onClick={onToggleModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onToggleModal: propTypes.func,
  totalCount: propTypes.number,
	totalPrice: propTypes.number
}

Controls.defaultProps = {
  onToggleModal: () => {},
	totalCount: 0,
	totalPrice: 0
}

export default React.memo(Controls);

import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';
import { Link } from 'react-router-dom';
import { localize } from '../../utils/localize';

function BasketSimple({sum, amount, onOpen, language}) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
      <Link className={cn('homeLink')} to='/'>
        {localize['Главная'][language]}
      </Link>
      <div>
        <span className={cn('label')}>
					{localize['В корзине'][language]}:
				</span>
        <span className={cn('total')}>
					{amount
						? `${amount} ${plural(
								amount,
								`${localize['Товар'][language]}`,
								`${localize['Товара'][language]}`,
								`${localize['Товаров'][language]}`,
						  )} / ${numberFormat(sum)} ₽`
						: `${localize['Пусто'][language]}`}
				</span>
        <button className='BasketSimple__button' onClick={onOpen}>
					{localize['Перейти'][language]}
				</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  language: propTypes.string.isRequired,
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);

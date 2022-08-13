import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';
import { Link } from 'react-router-dom';
import { localize } from '../../utils/localize';
import useSelector from '../../utils/use-selector';


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');

  const select = useSelector(state => ({
		language: state.localization.language,
  }));

  return (
    <div className={cn()}>
      <Link className={cn('homeLink')} to='/'>
        {localize['Главная'][select.language]}
      </Link>
      <div>
        <span className={cn('label')}>
					{localize['В корзине'][select.language]}:
				</span>
        <span className={cn('total')}>
					{amount
						? `${amount} ${plural(
								amount,
								`${localize['Товар'][select.language]}`,
								`${localize['Товара'][select.language]}`,
								`${localize['Товаров'][select.language]}`,
						  )} / ${numberFormat(sum)} ₽`
						: `${localize['Пусто'][select.language]}`}
				</span>
        <button className='BasketSimple__button' onClick={onOpen}>
					{localize['Перейти'][select.language]}
				</button>
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

import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom';
import numberFormat from "../../utils/numberFormat";
import {dictionaryEnum} from '../../enums/dictionaryEnum';
import './styles.css';
import useSelector from '../../utils/use-selector';

function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');

	const select = useSelector(state => ({
		lang: state.common.language
	}));

  return (
    <div className={cn()}>
			<Link to="/" className={cn('title')}>
				{dictionaryEnum.home[select.lang]}
			</Link>
			<div className={cn('container')}>
				<span className={cn('label')}>{dictionaryEnum.inBasket[select.lang]}:</span>
				<span className={cn('total')}>
      {amount
					? `${amount} ${plural(amount, dictionaryEnum.item[select.lang], dictionaryEnum.goods[select.lang],dictionaryEnum.goods[select.lang])} / ${numberFormat(sum)} ₽`
					: dictionaryEnum.empty[select.lang]
			}
        </span>
				<button className='BasketSimple__button' onClick={onOpen}>{dictionaryEnum.go[select.lang]}</button>
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

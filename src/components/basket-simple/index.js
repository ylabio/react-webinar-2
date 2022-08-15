import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom';
import numberFormat from "../../utils/numberFormat";
import {dictionaryEnum} from '../../enums/dictionaryEnum';
import './styles.css';

function BasketSimple({sum, amount, onOpen, lang}) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
		  <Link to="/" className={cn('title')}>
			  {dictionaryEnum.home[lang]}
		  </Link>
		  <div className={cn('container')}>
			  <span className={cn('label')}>{dictionaryEnum.inBasket[lang]}:</span>
			  <span className={cn('total')}>
      {amount
			  ? `${amount} ${plural(amount, dictionaryEnum.item[lang], dictionaryEnum.goods[lang],dictionaryEnum.goods[lang])} / ${numberFormat(sum)} ₽`
			  : dictionaryEnum.empty[lang]
		  }
        </span>
			  <button className='BasketSimple__button' onClick={onOpen}>{dictionaryEnum.go[lang]}</button>
		  </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  lang: propTypes.string
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);

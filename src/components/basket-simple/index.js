import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom';
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import Navigation from '../navigation';

function BasketSimple({sum, amount, onOpen, translate}) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
		  <Navigation translate={translate} />
		  <div className={cn('container')}>
			  <span className={cn('label')}>{translate('inBasket')}:</span>
			  <span className={cn('total')}>
      {amount
			  ? `${amount} ${plural(amount, translate('item'), translate('goods'), translate('goods'))} / ${numberFormat(sum)} ₽`
			  : translate('empty')
		  }
        </span>
			  <button className='BasketSimple__button' onClick={onOpen}>{translate('go')}</button>
		  </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
	translate: propTypes.func
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
	translate: ()=>{}
}

export default React.memo(BasketSimple);

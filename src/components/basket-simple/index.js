import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import {Link} from 'react-router-dom';
import useSelector from '../../utils/use-selector';
import {localization} from '../../utils/translations';


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');

  const language = localization[useSelector(state => state.languages).language];
  return (
    <div className={cn()}>
      <span className={cn('main-page-link')}><Link to={'/'}>{language.mainPage}</Link></span>
      <span>
        <span className={cn('label')}>{language.inCart}:</span>
        <span className={cn('total')}>
      {amount
        ? `${amount} ${language.goods(amount)} / ${numberFormat(sum)} ₽`
        : language.empty
      }
      </span>
        <button className='BasketSimple__button' onClick={onOpen}>{language.goCart}</button>
      </span>

    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);

import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import {useNavigate} from "react-router-dom";
import numberFormat from "utils/number-format";
import './styles.css';
import useLanguage from "utils/use-language";


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  const navigate = useNavigate();
  const translation = useLanguage()

  const onNavigateMainPage = () => {
    navigate(`/`)
  };

  return (
    <div className={cn()}>
      <div className={cn('link')} onClick={onNavigateMainPage}>{translation('home')}</div>
      <div>
        <span className={cn('label')}>{translation('inBasket')}:</span>
        <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, translation('product'), translation('product2'), translation('product5'))} / ${numberFormat(sum)} ₽`
        : translation('empty')
      }
      </span>
        <button className='BasketSimple__button' onClick={onOpen}>{translation('go')}</button>
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
  onOpen: () => {
  },
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);

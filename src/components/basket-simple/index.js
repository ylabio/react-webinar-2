import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import Router from "../router";
import translate from "../../utils/translate";


function BasketSimple({sum, amount, onOpen, language}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <Router to={"/"} className={cn('home')}>{translate(language, "basket-simple-home")}</Router>
      <div>
        <span className={cn('label')}>{translate(language, "basket-simple-label")}</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, translate(language, "basket-simple-total-nominative"),
                                        translate(language, "basket-simple-total-genitive"), 
                                        translate(language, "basket-simple-total-genitive-plural"))} 
            / ${numberFormat(sum)} ₽`
          : translate(language, "basket-simple-total-empty")
        }
        </span>
        <button className='BasketSimple__button' onClick={onOpen}>
          {translate(language, "basket-simple-button")}
        </button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  language: propTypes.string.isRequired
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  language: "ru"
}

export default React.memo(BasketSimple);

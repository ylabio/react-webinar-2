import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';

function BasketSimple({sum, amount, onOpen, strings}) {
  const cn = bem('BasketSimple');
  const {heading, state, buttonCheckout: button, plural: pluralItems} = strings;

  return (
    <div className={cn()}>
      <span className={cn('label')}>{heading}:</span>
      <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, ...pluralItems)} / ${numberFormat(sum)} ₽`
            : state
          }
          </span>
      <button className="BasketSimple__button" onClick={onOpen}>{button}</button>
    </div>
  );
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  strings: propTypes.exact({
    title: propTypes.string,
    heading: propTypes.string,
    empty: propTypes.string,
    plural: propTypes.arrayOf(propTypes.string),
    total: propTypes.string,
    buttonCheckout: propTypes.string,
    buttonClose: propTypes.string,

  }).isRequired
};

BasketSimple.defaultProps = {
  sum: 0,
  amount: 0
};

export default React.memo(BasketSimple);

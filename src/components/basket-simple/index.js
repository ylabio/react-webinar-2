import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import { Link } from 'react-router-dom';
import './style.css';
import useSelector from '../../utils/use-selector';

function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');

  const select = useSelector(state => ({
    main: state.names.names.main,
    inBasketText: state.names.names.inBasketText,
    emptyText: state.names.names.emptyText,
    item1Name: state.names.names.item1Name,
    item2Name: state.names.names.item2Name,
    item3Name: state.names.names.item3Name,
    goButtonName: state.names.names.goButtonName,
  }));

  return (
    <div className={cn()}>
      <span className={cn('main')}><Link to={`/`}>{select.main}</Link></span>
      <span className={cn('label')}>{select.inBasketText}:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, select.item1Name, select.item2Name, select.item3Name)} / ${numberFormat(sum)} ₽`
        : `${select.emptyText}`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{select.goButtonName}</button>
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

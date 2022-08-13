import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import {Link} from 'react-router-dom';


function BasketWithLink(props) {
  const cn = bem('BasketWithLink');

  return (
    <div className={cn()}>
      <span className={cn('main-page-link')}><Link to={'/'}>{props.words.mainPage}</Link></span>
      <span>
        <span className={cn('label')}>{props.words.inCart}:</span>
        <span className={cn('total')}>
      {props.amount
        ? `${props.amount} ${props.words.goods(props.amount)} / ${numberFormat(props.sum)} ₽`
        : props.words.empty
      }
      </span>
        <button className='BasketWithLink__button' onClick={props.onOpen}>{props.words.goCart}</button>
      </span>

    </div>
  )
}

BasketWithLink.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  words: propTypes.object.isRequired,
  amount: propTypes.number
}

BasketWithLink.defaultProps = {
  sum: 0,
  amount: 0
}

export default React.memo(BasketWithLink);

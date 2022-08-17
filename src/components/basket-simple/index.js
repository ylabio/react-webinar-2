import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';
import MLText from '../../utils/mul-lang-text';
import MlProd from '../../utils/mul-lang-prod';


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{MLText('inBasket')}:</span>
      <span className={cn('total')}>
      {amount?<>{amount} {MlProd(amount)} / {numberFormat(sum)} ₽</>
        : MLText('empty')
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{MLText('go')}</button>
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

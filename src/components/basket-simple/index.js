import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';


function BasketSimple({ onOpen, sum, amount, langPack }) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{langPack.cart}</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, ...langPack.subtotal)} 
        / ${numberFormat(sum)} ${langPack.currencySymbol}`
        : langPack.emptySubtotal
      }
      </span>
      <button onClick={onOpen}>{langPack.openButton}</button>
    </div>
  );
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  langPack: propTypes.object.isRequired
};

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
};

export default React.memo(BasketSimple);

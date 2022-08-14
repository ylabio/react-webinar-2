import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/numberFormat';
import './styles.css';

function BasketSimple({ sum, amount, onOpen, ln = {} }) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{ln.label}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(
              amount,
              ln.singleProduct,
              ln.pluralProduct,
              ln.extraProduct
            )} / ${numberFormat(sum)} ₽`
          : ln.empty}
      </span>
      <button className="BasketSimple__button" onClick={onOpen}>
        {ln.actionBtn}
      </button>
    </div>
  );
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  ln: propTypes.objectOf(propTypes.string).isRequired,
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);

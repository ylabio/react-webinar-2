import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/numberFormat';
import './styles.css';
import translate from '../../utils/translate';

function BasketSimple({ sum, amount, onOpen, language }) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
      <div className={cn('cart')}>
        <span className={cn('label')}>{`${translate(language, 'inBasket')}:`}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${translate(language, 'product', amount)} / ${numberFormat(sum)} ₽`
            : `${translate(language, 'empty')}`}
        </span>
        <button className="BasketSimple__button" onClick={onOpen}>
          {translate(language, 'go')}
        </button>
      </div>
    </div>
  );
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  language: propTypes.string.isRequired,
};

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default React.memo(BasketSimple);

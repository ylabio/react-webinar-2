import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './styles.css';
import { Link } from 'react-router-dom';

function BasketSimple({ sum, amount, onOpen, dictionary }) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
      <Link to={'/'} className={cn('home')}>
        {dictionary.main}
      </Link>
      <div className={cn('head')}>
        <span className={cn('label')}>{dictionary.inCart}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(
                amount,
                'товар',
                'товара',
                'товаров'
              )} / ${numberFormat(sum)} ₽`
            : `${dictionary.empty}`}
        </span>
        <button className="BasketSimple__button" onClick={onOpen}>
          {dictionary.goTo}
        </button>
      </div>
    </div>
  );
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  dictionary: propTypes.object,
};

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  dictionary: {},
};

export default React.memo(BasketSimple);

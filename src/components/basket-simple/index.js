import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './styles.css';

function BasketSimple({ sum, amount, onOpen, content }) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{content.inCart}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(
              amount,
              content.items[0],
              content.items[1],
              content.items[2]
            )} / ${numberFormat(sum)} ₽`
          : content.empty}
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>
        {content.openCart}
      </button>
    </div>
  );
}

BasketSimple.propTypes = {
  content: propTypes.object.isRequired,
  onOpen: propTypes.func,
  sum: propTypes.number,
  amount: propTypes.number,
};

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default React.memo(BasketSimple);

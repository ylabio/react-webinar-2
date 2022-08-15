import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './styles.css';
import { Link } from 'react-router-dom';
import useLanguage from '../../utils/use-language';

function BasketSimple({ sum, amount, onOpen }) {
  const cn = bem('BasketSimple');
  const { content } = useLanguage();
  return (
    <div className={cn()}>
      <Link to='/' className={cn('link')}>
        {content.main}
      </Link>
      <div>
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
    </div>
  );
}

BasketSimple.propTypes = {
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

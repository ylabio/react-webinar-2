import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/numberFormat';
import './styles.css';
import { Link } from 'react-router-dom';

function BasketSimple({ sum, amount, onOpen, words, language }) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <Link className='Link' to='/'>
        {language == 'ru' ? words.ru.buttonToMain : words.eng.buttonToMain}
      </Link>

      <span className={cn('label')}>{language == 'ru' ? words.ru.inCart : words.eng.inCart}</span>
      <span className={cn('total')}>
        {language == 'ru'
          ? amount
            ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
            : `пусто`
          : amount
          ? `${amount} ${plural(amount, 'item', 'items')} / ${numberFormat(sum)} ₽`
          : `empty`}
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>
        {language == 'ru' ? words.ru.openCart : words.eng.openCart}
      </button>
    </div>
  );
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
};

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default React.memo(BasketSimple);

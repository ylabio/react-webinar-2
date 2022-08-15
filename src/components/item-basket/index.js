import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';
import { cn as bem } from '@bem-react/classname';
import './styles.css';
import { Link } from 'react-router-dom';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item]),
  };

  return (
    <div className={cn()}>
      <Link to={`/${props.item._id}`}>
        <div onClick={props.close} className={cn('title')}>
          {props.item.title}
        </div>
      </Link>

      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)}{' '}
          {props.language === 'ru' ? props.words.ru.amount : props.words.eng.amount}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>
            {props.language === 'ru' ? props.words.ru.buttonDelete : props.words.eng.buttonDelete}
          </button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {};

export default React.memo(ItemBasket);

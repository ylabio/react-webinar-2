import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';
import useStore from '../../utils/use-store';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const store = useStore();

  let navigate = useNavigate();

  const callbacks = {
    onRemove: useCallback(() => props.onRemove(props.item._id), [props.onRemove, props.item]),
    onOpenItem: useCallback((id) => {
      navigate(`/item/${id}`);
      store.get('modals').close();
    }, []),
  };

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <span
          className={cn('title')}
          onClick={() => {
            callbacks.onOpenItem(props.item._id);
          }}
        >
          {props.item.title}
        </span>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
};

export default React.memo(ItemBasket);

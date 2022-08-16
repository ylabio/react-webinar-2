import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/number-format';
import { cn as bem } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import useStore from '../../utils/use-store';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const navigate = useNavigate();

  const store = useStore();

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item]),
    onClickItem: useCallback((e) => {
      navigate(`/${props.item._id}`)
      store.get('modals').close()
    })
  };

  console.log(props)

  return (
    <div className={cn()}>
      <div onClick={() => callbacks.onClickItem()} className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item?.price)} ₽</div>
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

ItemBasket.defaultProps = {};

export default React.memo(ItemBasket);

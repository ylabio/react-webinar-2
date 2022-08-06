import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Button from '../button';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const {item} = props;
  const {count} = item;

  const callbacks = {
    onAdd: useCallback(() => {
      props.onAdd(item)
    }, [props.onAdd,  item]),
    onDelete: useCallback(() => {
      props.onDelete(item.code)
    }, [props.onDelete,  item])
  };

  return (
    <div className={'Item'}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
        <div className={'Item-price'}>
            {item.price}{' \u20bd'}
        </div>
        {count && <div className={'Item-count'}>
            {count} шт
        </div>}
        {count ? <Button callback={callbacks.onDelete} title='Удалить' /> : <Button callback={callbacks.onAdd} title='Добавить' />}
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onDeleted: propTypes.func
}

Item.defaultProps = {
  onDeleted: () => {}
}

export default React.memo(Item);

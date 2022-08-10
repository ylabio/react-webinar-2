import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Button from '../button';
import {getPrice} from '../../utils';
import '../item/style.css';

function ItemModal(props) {
  const cn = bem('Item');
  const {item} = props;
  const {count} = item;

  const callbacks = {
    onDelete: useCallback(() => {
      props.onDelete(item.code, item.count)
    }, [props.onDelete,  item])
  };

  return (
    <div className='Item'>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
        <div className='Item-price'>
            {getPrice(item.price)}
        </div>
        <div className='Item-count'>
            {count} шт
        </div>
        <Button callback={callbacks.onDelete} title='Удалить' />
    </div>
  )
}

ItemModal.propTypes = {
  item: propTypes.object.isRequired,
  onDeleted: propTypes.func
}

ItemModal.defaultProps = {
  onDeleted: () => {}
}

export default React.memo(ItemModal);

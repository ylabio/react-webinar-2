import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Button from '../button';
import {getPrice} from '../../utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const {item} = props;
  const {count} = item;

  const callbacks = {
    onAdd: useCallback(() => {
      props.onAdd(item)
    }, [props.onAdd,  item])
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
        <Button callback={callbacks.onAdd} title='Добавить' />
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
	onAdd: propTypes.func
}

Item.defaultProps = {
	onAdd: () => {}
}

export default React.memo(Item);

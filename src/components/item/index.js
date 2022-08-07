import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from 'src/utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onButton: useCallback(() => {
      props.onButton(props.item)
    }, [props.onButton, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        <p>{props.item.title}</p>
        <p>{numberFormat(props.item.price)}</p>
      </div>
      {props.item.count && <div className={cn('quantity')}>{props.item.count} шт.</div>}
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={callbacks.onButton}>
          {props.titleButton}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onButton: propTypes.func.isRequired,
  titleButton: propTypes.string.isRequired,
}

export default React.memo(Item);

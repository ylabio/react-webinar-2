import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { formatPrice } from '../../utils';

function Item(props) {
  const cn = bem('Item');

  // Счётчик выделений
  const [count, setCount] = useState(props.item.count);

  const callbacks = {
    onPush: useCallback((e) => {
      e.stopPropagation();
      setCount(props.item.count)
      props.onPush(props.item.code, props.item.title, props.item.price)
    }, [props.onPush, props.item])
  };

  return (
       <div className={cn()}>
          <div className={cn('number')}>
            {props.item.code}
          </div>
          <div className={cn('title')}>
            {props.item.title}
            <span>
              {formatPrice(props.item.price)} 
              {props.onToggle && <span>{count} шт</span>}
            </span>
          </div>
          <div className={cn('actions')}>
              <button onClick={callbacks.onPush}>Добавить</button>
          </div>
        </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onPush: propTypes.func.isRequired,
}

Item.defaultProps = {
  item: {},
  onPush: () => {},
}

export default React.memo(Item);

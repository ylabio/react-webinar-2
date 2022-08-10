import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { formatPrice } from '../../utils';

function ChosenItem(props) {
  const cn = bem('ChosenItem');

  // Счётчик выделений
  const [count, setCount] = useState(props.item.count);

  const callbacks = {
    onDelete: useCallback((e) => {
      e.stopPropagation();
      props.onDelete(props.item.code)
      setCount(props.item.count)
    }, [props.onDelete,  props.item]),
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
            <button onClick={callbacks.onDelete}>Удалить</button>
          </div>
        </div> 
  )
}

ChosenItem.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func.isRequired,
}

ChosenItem.defaultProps = {
  item: {},
  onDelete: () => {},
}

export default React.memo(ChosenItem);

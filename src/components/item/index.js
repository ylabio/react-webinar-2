import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {

    onClick: useCallback(() => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    }, [props.onSelect, props.item, setCount, count]),

    btnAction: useCallback((e) => {
      e.stopPropagation();
      props.btnAction(props.item.code)
    }, [props.onDelete, props.item])
  };


  props.model == 'Modal' ?
  props.con()
  : ''

  return (
    <div className={cn()} >
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      {props.model == 'Modal' ? <div className={cn('price')}>
        {props.item.count}
      </div> : ''}
      <div className={cn('price')}>
        {props.item.price}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.btnAction}>
          {props.btnActionName}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => { },
  onDeleted: () => { }
}

export default React.memo(Item);

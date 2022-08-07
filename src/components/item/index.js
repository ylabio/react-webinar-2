import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item(props) {
  // console.log('Item')
  const cn = bem('Item');
  // console.log( props)
  // Счётчик выделений
  // const [count, setCount] = useState(0);

  const callbacks = {

    // onClick: useCallback(() => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected) {
    //     setCount(count + 1);
    //   }
    // }, [props.onSelect, props.item, setCount, count]),

    // onDelete: useCallback((e) => {
    //   e.stopPropagation();
    //   props.onDelete(props.item.code)
    // }, [props.onDelete,  props.item])
  };

  return (
    <div className={cn({'selected': props.item.selected})}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
        {/* {count ? ` | Выделялось ${count} ${plural(count, 'раз', 'раза', 'раз')}` : null} */}
      </div>
      <div className={cn('actions')}>
        <button onClick={() => props.addItemInBasket(props.item)}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired,
  addItemInBasket: propTypes.func.isRequired,
}

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {}
}

export default React.memo(Item);

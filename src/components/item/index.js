import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const [count, setCount] = useState(1);

  const onAddClickHandler = useCallback((item) => {
    setCount(prev => ++prev);
    props.onAddItem(item, count);
  }, [count])
  
  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {`${Intl.NumberFormat('ru-RU').format(props.item.price)} ₽`}
      </div>
      <div className={cn('actions')}>
        <button onClick={() => onAddClickHandler(props.item)}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddItem: propTypes.func
}

Item.defaultProps = {
  item: {},
  onAddItem: () => {}
}

export default React.memo(Item);

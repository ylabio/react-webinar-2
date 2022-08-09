import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const [count, setCount] = React.useState(props.item.count);

  const callbacks = {
      onAdd: useCallback(() => {
          props.onAdd(props.item)
          setCount(props.item.count)
      }, [props]),
      onDelete: useCallback(() => {
          props.onDelete(props.item.code)
          setCount(props.item.count)
      }, [props])
  }

  React.useEffect(()=> {
      setCount(props.item.count)
  }, [props])

  return (
      <>{props.isVisible && count === 0 ? "" : (
          <div className={cn()} >
              <div className={cn('number')}>
                  {props.item.code}
              </div>
              <div className={cn('title')}>
                  {props.item.title}
              </div>
              <div className={cn('price')}>
                  {`${props.item.price.toLocaleString('ru-RU')} ₽`}
              </div>
              {props.isVisible ? <div className={cn('sum')}>{`${count} шт`}</div> : ""}
              <div className={cn('actions')}>
                  {props.isVisible ? <button onClick={callbacks.onDelete}>
                          Удалить
                      </button>
                      :
                      <button onClick={callbacks.onAdd}>
                          Добавить
                      </button> }
              </div>
          </div>
      ) }</>

  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired
}

Item.defaultProps = {
  onAdd: () => {},
  onDelete: () => {}
}

export default React.memo(Item);

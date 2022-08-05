import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Store from "../../store";

function Item(props) {
  const cn = bem('Item');
  const price = Intl.NumberFormat("ru").format(props.item.price)

  // Счётчик добавлений
  const [count, setCount] = useState(0);

  const addNewProduct = (evt) => {
      evt.preventDefault();
      setCount(count + 1);
      console.log(count)
      // Store.addProduct(props.item.code, count);
  }

  // const callbacks = {
  //
  //   // onClick: useCallback(() => {
  //   //   props.onSelect(props.item.code);
  //   //   if (!props.item.selected) {
  //   //     setCount(count + 1);
  //   //   }
  //   // }, [props.onSelect, props.item, setCount, count]),
  //
  //   onDelete: useCallback((e) => {
  //     e.stopPropagation();
  //     props.onDelete(props.item.code)
  //   }, [props.onDelete,  props.item])
  // };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
          <div className={cn('wrapper')}>
            <p className={cn('price')}>{price +' ₽'}</p>
            {/*<button onClick={callbacks.onDelete}>*/}
            <button onClick={addNewProduct}>
              Добавить
            </button>
          </div>
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
  onSelect: () => {},
  onDeleted: () => {}
}

export default React.memo(Item);

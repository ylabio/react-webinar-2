import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {spaceInPrice} from "../../utils";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
      onItemAdd: useCallback((e) => {
          props.onItemAdd(props.item.code);
      }, [props.onItemAdd, props.item]),


      onItemDelete: useCallback((e) => {
          e.stopPropagation();
          props.onItemDelete(props.item.code)
      },[props.onItemDelete,  props.item]),
  };

  return (
    <div className={cn()}>
        <div className={cn('number')}>
            {props.item.code}
        </div>
        <div className={cn('title')}>
            {props.item.title}
        </div>
        <div className={cn('price')}>
            {spaceInPrice(props.item.price)} ₽
        </div>
            {props.item.id ? <div className={cn('quantity')} > {props.item.counter} шт </div> : null}
        <div className={cn('actions')}>
            <button onClick={!props.item.id? callbacks.onItemAdd :callbacks.onItemDelete}>
                {!props.item.id? "Добавить" : "Удалить"}
            </button>
        </div>
    </div>
  )
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    onItemAdd: propTypes.func.isRequired,
};

Item.defaultProps = {

};

export default React.memo(Item);

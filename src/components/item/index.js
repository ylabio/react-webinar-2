import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {spaceInPrice} from "../../utils";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
      onAddItem: useCallback((e) => {
          props.onAddItem(props.item.code);
      }, [props.onAddItem, props.item]),


      onItemDelete: useCallback((e) => {
          e.stopPropagation();
          props.onItemDelete(props.item.code)
      },[props.onItemDelete,  props.item]),
  };


  return (
    <div className={cn()}>
        <div className={cn('number')}>
            { props.item.code}
        </div>
        <div className={cn('title')}>
            {props.item.title}
        </div>
        <div className={cn('price')}>
            {spaceInPrice(props.item.price)} ₽
        </div>
            {props.openedModal ? <div className={cn('quantity')} > {props.item.counter} шт </div> : null}
        <div className={cn('actions')}>
            <button onClick={!props.openedModal ? callbacks.onAddItem : callbacks.onItemDelete}>
                {!props.openedModal ? "Добавить" : "Удалить"}
            </button>
        </div>
    </div>
  )
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    onAddItem: propTypes.func.isRequired,
    onItemDelete: propTypes.func.isRequired,
    openedModal:propTypes.bool,
};

Item.defaultProps = {
    onAddItem: () => {},
    onItemDelete: () => {}
};

export default React.memo(Item);

import React, {useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import propTypes from 'prop-types';
import useStore from "../../utils/use-store";
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const store = useStore();
  const navigate = useNavigate();

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    viewProduct: useCallback(() => {
      store.get('modals').close();
      navigate(`product/${props.item._id}`)
    }, [props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div onClick={callbacks.viewProduct} className={cn('title')}>{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>Удалить</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);

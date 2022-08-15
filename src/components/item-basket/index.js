import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {Link} from "react-router-dom";

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  
  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item])
  };
  
  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div
        className={cn('title')}>
        <Link to={`/productInformation/${props.item._id}`} onClick={() => {
          props.getProductInformation(props.item._id)
          props.closeModal()
        }}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.words.pcs}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.words.delete}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  getProductInformation: propTypes.func,
  closeModal: propTypes.func
}

ItemBasket.defaultProps = {
  onRemove: () => {
  },
  getProductInformation: () => {
  },
  closeModal: () => {
  }
}

export default React.memo(ItemBasket);

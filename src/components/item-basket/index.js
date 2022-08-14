import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import { Link } from "react-router-dom"
import './styles.css';
import useSelector from '../../utils/use-selector';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const select = useSelector(state => ({
    pcsText: state.names.names.pcsText,
    deleteButtonName: state.names.names.deleteButtonName
  }));

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    pageLoad: useCallback((e) => props.pageLoad(props.item._id), [props.pageLoad, props.item]),
    onClose: useCallback(() => props.onClose(), [props.onClose,  props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={()=>(callbacks.pageLoad(props.item._id), callbacks.onClose())}>
      <Link to={`/${props.item._id}`}>{props.item.title}</Link></div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {select.pcsText}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{select.deleteButtonName}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func.isRequired,
  pageLoad: propTypes.func.isRequired
}

export default React.memo(ItemBasket);

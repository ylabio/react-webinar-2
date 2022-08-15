import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import { useNavigate } from 'react-router-dom';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item])
  };

  const handleClick = () => {
    navigate(`/${props.item._id}`);
    props.onClose();
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={handleClick}>{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.lang ? 'pcs' : 'шт'}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.lang ? 'Remove' : 'Удалить'}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  lang: propTypes.bool.isRequired
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);

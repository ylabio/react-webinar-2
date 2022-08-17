import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {Link, useNavigate} from "react-router-dom";

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onClose: useCallback(() => props.onClose(), []),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <Link to={props.pathLink} className={cn('title')} onClick={callbacks.onClose}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.lang.pcs}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.lang.delete}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func,
  lang: propTypes.object,
  pathLink: propTypes.string,
}

ItemBasket.defaultProps = {
  lang: {},
  pathLink: '',
}

export default React.memo(ItemBasket);

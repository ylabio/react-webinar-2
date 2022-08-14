import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import {useNavigate} from "react-router-dom"
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const navigate = useNavigate()

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
    onNav: useCallback(() => navigate(`${props.redirectTo}/${props.item._id}`, {replace: true}), [props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')}
           onClick={callbacks.onNav}>
        {props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  redirectTo: propTypes.string
}

Item.defaultProps = {
  onAdd: () => {},
  redirectTo: '/'
}

export default React.memo(Item);

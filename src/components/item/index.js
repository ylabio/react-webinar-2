import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const navigate = useNavigate();

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
    onArticle: useCallback((e) => navigate(`/article/${props.item._id}`), [])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')} onClick={callbacks.onArticle}>
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
  onAdd: propTypes.func.isRequired,
}

export default React.memo(Item);

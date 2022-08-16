import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';
import PropTypes from "prop-types";

function Item({articleRoute, item, onAdd}) {
  const cn = bem('Item');
  const navigate = useNavigate();

  const callbacks = {
    // Добавляет товар в корзину
    onAdd: useCallback((e) => onAdd(item._id), [onAdd, item]),
    // Для перехода к просмотру подробного описания товара из каталога
    onArticle: useCallback((e) => navigate(`${articleRoute}${item._id}`), [])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')} onClick={callbacks.onArticle}>
        {item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(item.price)}&nbsp;&#8381;</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  articleRoute: propTypes.string.isRequired,
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
}

export default React.memo(Item);

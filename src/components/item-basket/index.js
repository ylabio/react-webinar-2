import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();

  const callbacks = {
    // Удаляет товар из корзины
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    // Для перехода к просмотру подробного описания товара из корзины
    onArticle: useCallback((e) => navigate(`/article/${props.item?._id}`), []),
    // Закрывает модальное окно корзины при переходе к подробному описанию товара
    onArticleClose: useCallback(() => props.onClose(), []),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div onClick={callbacks.onArticleClose}>
        <div className={cn('title')} onClick={callbacks.onArticle}>
          {props.item.title}
        </div>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired
}

export default React.memo(ItemBasket);

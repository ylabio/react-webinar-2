import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function ItemBasket({articleRoute, item, onRemove, onClose}) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const callbacks = {
    // Удаляет товар из корзины
    onRemove: useCallback((e) => onRemove(item._id), [onRemove, item]),
    // Для перехода к просмотру подробного описания товара из корзины
    onArticle: useCallback((e) => navigate(`${articleRoute}${item?._id}`), []),
    // Закрывает модальное окно корзины при переходе к подробному описанию товара
    onArticleClose: useCallback(() => onClose(), []),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div onClick={callbacks.onArticleClose}>
        <div className={cn('title')} onClick={callbacks.onArticle}>
          {item.title}
        </div>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)}&nbsp;&#8381;</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{t('ItemBasketRemove')}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  articleRoute: propTypes.string,
  item: propTypes.object.isRequired,
  onRemove: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired
}

export default React.memo(ItemBasket);

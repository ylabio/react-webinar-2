import React, { useCallback, useEffect } from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';
import useStore from '../../utils/use-store';
import numberFormat from '../../utils/number-format';

function ArticleInfo({ item, madeIn, category }) {
  const cn = bem('ArticleInfo');
  const store = useStore();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{item.description}</div>
      <div className={cn('country')}>Страна производитель: <strong>{madeIn.title} ({madeIn.code})</strong></div>
      <div className={cn('category')}>Категория: <strong>{category.title}</strong></div>
      <div className={cn('edition')}>Год выпуска: <strong>{item.edition}</strong></div>
      <div className={cn('price')}>Цена: {numberFormat(item.price)} ₽</div>
      <button onClick={() => callbacks.addToBasket(item._id)}>Добавить</button>
    </div>
  )
}

ArticleInfo.propTypes = {
  item: propTypes.object.isRequired
}

export default React.memo(ArticleInfo)
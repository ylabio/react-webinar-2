import React, { useCallback, useEffect } from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';
import numberFormat from '../../utils/number-format';

function ArticleInfo({ article, addToBasket }) {
  const cn = bem('ArticleInfo');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{article.description}</div>
      <div className={cn('country')}>Страна производитель: <strong>{article.maidIn.title} ({article.maidIn.code})</strong></div>
      <div className={cn('category')}>Категория: <strong>{article.category.title}</strong></div>
      <div className={cn('edition')}>Год выпуска: <strong>{article.edition}</strong></div>
      <div className={cn('price')}>Цена: {numberFormat(article.price)} ₽</div>
      <button onClick={() => addToBasket(article._id)}>Добавить</button>
    </div>
  )
}

ArticleInfo.propTypes = {
  article: propTypes.object.isRequired
}

export default React.memo(ArticleInfo)
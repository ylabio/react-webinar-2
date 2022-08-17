import React, { useCallback, useEffect } from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';
import numberFormat from '../../utils/number-format';
import translate from '../../utils/translate';

function ArticleInfo({ article, addToBasket, lang }) {
  const cn = bem('ArticleInfo');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{article.description}</div>
      <div className={cn('country')}>{translate(lang, 'Страна производитель')}: <strong>{article.maidIn.title} ({article.maidIn.code})</strong></div>
      <div className={cn('category')}>{translate(lang, 'Категория')}: <strong>{article.category.title}</strong></div>
      <div className={cn('edition')}>{translate(lang, 'Год выпуска')}: <strong>{article.edition}</strong></div>
      <div className={cn('price')}>{translate(lang, 'Цена')}: {numberFormat(article.price)} ₽</div>
      <button onClick={() => addToBasket(article._id)}>{translate(lang, 'Добавить')}</button>
    </div>
  )
}

ArticleInfo.propTypes = {
  article: propTypes.object.isRequired
}

export default React.memo(ArticleInfo)
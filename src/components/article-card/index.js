import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import numberFormat from "../../utils/number-format";
import './style.css';

function ArticleCard({article, onAdd, t}) {

  // CSS классы по БЭМ
  const cn = bem('ArticleCard');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{article.description}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('article.producingCountry')}:</div>
        <div className={cn('value')}>{article.maidIn?.title} ({article.maidIn?.code})</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('article.category')}:</div>
        <div className={cn('value')}>{article.category?.title}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('article.releaseYear')}:</div>
        <div className={cn('value')}>{article.edition}</div>
      </div>
      <div className={cn('prop', {size: 'big'})}>
        <div className={cn('label')}>{t('article.price')}:</div>
        <div className={cn('value')}>{numberFormat(article.price)} ₽</div>
      </div>
      <button onClick={() => onAdd(article._id)}>{t('article.add')}</button>
    </div>
  )
}

ArticleCard.propTypes = {
  article: propTypes.object.isRequired,
  onAdd: propTypes.func,
  t: propTypes.func
}

ArticleCard.defaultProps = {
  article: {},
  onAdd: () => {},
  t: (text) => text
}

export default React.memo(ArticleCard);

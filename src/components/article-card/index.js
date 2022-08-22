import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname'
import numberFormat from "../../utils/number-format";
import './style.css';


import Button from "../button";

function ArticleCard({ article, onAdd, t }) {

  // CSS классы по БЭМ
  const cn = bem('ArticleCard');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{article.description}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('country')}:</div>
        <div className={cn('value')}>{article.maidIn?.title} ({article.maidIn?.code})</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('category')}:</div>
        <div className={cn('value')}>{article.category?.title}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('edition')}</div>
        <div className={cn('value')}>{article.edition}</div>
      </div>
      <div className={cn('prop', { size: 'big' })}>
        <div className={cn('label')}>{t('edition')}</div>
        <div className={cn('value')}>{numberFormat(article.price)} ₽</div>
      </div>
      <Button onClick={() => onAdd(article._id)} text={t('article.add')} type={'button'} />
    </div>
  )
}

ArticleCard.propTypes = {
  article: propTypes.object.isRequired,
  onAdd: propTypes.func
}

ArticleCard.defaultProps = {
  article: {},
  onAdd: () => { }
}

export default React.memo(ArticleCard);

import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './styles.css';
import numberFormat from '../../utils/numberFormat';

function ArticleInfo({ onAdd, article }) {
  const cn = bem('ArticleInfo');

  return (
    <div className={cn()}>
      <p className={cn('field')}>{article.description}</p>
      <div className={cn('field')}>
        Страна производитель: <span className={cn('bold')}>{article.country}</span>
      </div>
      <div className={cn('field')}>
        Категория: <span className={cn('bold')}>{article.category}</span>
      </div>
      <div className={cn('field')}>
        Год выпуска: <span className={cn('bold')}>{article.edition}</span>
      </div>
      <div className={cn('price')}>{`Цена: ${numberFormat(article.price)} ₽`}</div>
      <button className={cn('button')} onClick={() => onAdd(article._id)}>
        Добавить
      </button>
    </div>
  );
}

ArticleInfo.propTypes = {
  onAdd: propTypes.func,
  article: propTypes.object.isRequired,
};

ArticleInfo.defaultProps = {
  onAdd: () => {},
};

export default React.memo(ArticleInfo);

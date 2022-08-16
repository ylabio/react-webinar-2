import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './styles.css';
import numberFormat from '../../utils/numberFormat';
import translate from '../../utils/translate';

function ArticleInfo({ onAdd, article, language }) {
  const cn = bem('ArticleInfo');

  return (
    <div className={cn()}>
      <p className={cn('field')}>{article.description}</p>
      <div className={cn('field')}>
        {`${translate(language, 'countryOfOrigin')}:`}{' '}
        <span className={cn('bold')}>{article.country}</span>
      </div>
      <div className={cn('field')}>
        {`${translate(language, 'category')}:`}{' '}
        <span className={cn('bold')}>{article.category}</span>
      </div>
      <div className={cn('field')}>
        {`${translate(language, 'yearOfEdition')}:`}{' '}
        <span className={cn('bold')}>{article.edition}</span>
      </div>
      <div className={cn('price')}>{`${translate(language, 'price')}: ${numberFormat(
        article.price
      )} ₽`}</div>
      <button className={cn('button')} onClick={() => onAdd(article._id)}>
        {`${translate(language, 'add')}`}
      </button>
    </div>
  );
}

ArticleInfo.propTypes = {
  onAdd: propTypes.func,
  article: propTypes.object.isRequired,
  language: propTypes.string.isRequired,
};

ArticleInfo.defaultProps = {
  onAdd: () => {},
};

export default React.memo(ArticleInfo);

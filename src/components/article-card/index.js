import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import numberFormat from "../../utils/number-format";
import './style.css';

function ArticleCard(props) {

  // CSS классы по БЭМ
  const cn = bem('ArticleCard');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.article.description}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{props.countryText}</div>
        <div className={cn('value')}>{props.article.maidIn?.title} ({props.article.maidIn?.code})</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{props.categoryText}</div>
        <div className={cn('value')}>{props.article.category?.title}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{props.yearText}</div>
        <div className={cn('value')}>{props.article.edition}</div>
      </div>
      <div className={cn('prop', {size: 'big'})}>
        <div className={cn('label')}>{props.priceText}</div>
        <div className={cn('value')}>{numberFormat(props.article.price)} ₽</div>
      </div>
      <button onClick={() => props.onAdd(props.article._id)}>{props.addText}</button>
    </div>
  )
}

ArticleCard.propTypes = {
  article: propTypes.object.isRequired,
  onAdd: propTypes.func,
  priceText: propTypes.string,
  countryText: propTypes.string,
  categoryText: propTypes.string,
  yearText: propTypes.string,
  addText: propTypes.string
}

ArticleCard.defaultProps = {
  article: {},
  onAdd: () => {},
  priceText: 'Цена:',
  countryText: 'Страна производитель:',
  categoryText: 'Категория:',
  yearText: 'Год выпуска:',
  addText: 'Добавить'
}

export default React.memo(ArticleCard);

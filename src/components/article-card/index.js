import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from "../../utils/numberFormat";
import './styles.css';

function ArticleCard(props) {
  const cn = bem('ArticleCard');
  return (
    <div className={cn()}>
      <div className={cn('Description')}>{props.article.description}</div>
      <div className={cn('Prop')}>
        <div className={cn('Label')}>{props.tnslt(props.lang, 'country')}</div>
        <span className={cn('Value')}>{props.article.maidIn?.title} ({props.article.maidIn?.code})</span>
      </div>

      <div className={cn('Prop')}>
        <div className={cn('Label')}>{props.tnslt(props.lang, 'category')}</div>
        <span className={cn('Value')}>{props.article.category?.title}</span>
      </div>

      <div className={cn('Prop')}>
        <div className={cn('Label')}>{props.tnslt(props.lang, 'year')}</div>
        <span className={cn('Value')}>{props.article.edition}</span>
      </div>

      <div className={cn('Prop', {size: 'big'})}>
        <div className={cn('Label', {font: 'bold'})}>{props.tnslt(props.lang, 'price')}</div>
        <span className={cn('Value')}>{numberFormat(props.article.price)} ₽</span>
      </div>

      <button onClick={() => props.onAdd(props.article._id)}>{props.tnslt(props.lang, 'add')}</button>

    </div>

  )
}

ArticleCard.propTypes = {
  article: propTypes.object,
  onAdd: propTypes.func,
  tnslt: propTypes.func,
}
ArticleCard.defaultProps = {}

export default React.memo(ArticleCard)
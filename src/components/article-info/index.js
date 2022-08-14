import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './styles.css';
import numberFormat from '../../utils/numberFormat';

function ArticleInfo(props) {
  const cn = bem('ArticleInfo');

  const callbacks = {
    onAdd: useCallback(
      e => {
        props.onAdd(props.data._id);
      },
      [props.onAdd, props.data]
    ),
  };

  return (
    <div className={cn()}>
      <div className={cn('text')}>
        <span className={cn('text__small')}>{props.data.description}</span>
      </div>
      <div className={cn('text')}>
        <span className={cn('text__small')}>Страна производитель: </span>
        <span>
          <b>{props.data.maidIn.title}</b>
        </span>
      </div>
      <div className={cn('text')}>
        <span className={cn('text__small')}>Категория: </span>
        <span>
          <b>{props.data.category.title}</b>
        </span>
      </div>
      <div className={cn('text')}>
        <span className={cn('text__small')}>Год выпуска: </span>
        <span>
          <b>{props.data.edition}</b>
        </span>
      </div>
      <div className={cn('text')}>
        <span className={cn('text__large')}>Цена: </span>
        <span className={cn('text__large')}>
          {numberFormat(props.data.price,{maximumFractionDigits: 0})} ₽
        </span>
      </div>
      <button className={cn('button')} onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>
  );
}

ArticleInfo.propTypes = {
  data: propTypes.object,
  onAdd: propTypes.func,
};

ArticleInfo.defaultProps = {
  onAdd: () => {},
};

export default React.memo(ArticleInfo);

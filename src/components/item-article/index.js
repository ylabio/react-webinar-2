import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function ItemArticle(props) {
  const cn = bem('ItemArticle');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {props.item.description}
      </div>
      <div className={cn('title')}>
        <span className={cn('label')}>{props.lang ? 'Made in: ' : 'Страна производитель: '}</span>
        <span className={cn('info')}>{`${props.maidIn.title} (${props.maidIn.code})`}</span>
      </div>
      <div className={cn('title')}>
        <span className={cn('label')}>{props.lang ? 'Category: ' : 'Категория: '}</span>
        <span className={cn('info')}>{props.category.title}</span>
      </div>
      <div className={cn('title')}>
        <span className={cn('label')}>{props.lang ? 'Year of release: ' : 'Год выпуска: '}</span>
        <span className={cn('info')}>{props.item.edition}</span>
      </div>
      <div className={cn('title')}>
        <div className={cn('price')}>{props.lang ? 'Price: ' : 'Цена: '} {`${numberFormat(props.item.price)} ₽`}</div>
      </div>
      <button onClick={callbacks.onAdd}>{props.lang ? 'Add to cart' : 'Добавить'}</button>
    </div>
  )
}

ItemArticle.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  lang: propTypes.bool.isRequired
}

ItemArticle.defaultProps = {
  onAdd: () => {},
}

export default React.memo(ItemArticle);

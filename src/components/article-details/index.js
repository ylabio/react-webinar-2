import React, {useCallback} from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";

function ArticleDetails(props) {
  const cn = bem('ArticleDetails');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item.id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.item.description}</div>
      <div className={cn('country')}>Страна производитель: <span className={cn('bold')}>{props.item.country} ({props.item.countryCode})</span></div>
      <div className={cn('category')}>Категория: <span className={cn('bold')}>{props.item.category}</span></div>
      <div className={cn('edition')}>Год выпуска: <span className={cn('bold')}>{props.item.editionYear}</span></div>
      <div className={cn('price')}>Цена: {numberFormat(props.item.price)} ₽</div>
      <button className={cn('button')}
              onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

ArticleDetails.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

ArticleDetails.defaultProps = {
  onAdd: () => {},
}

export default React.memo(ArticleDetails);

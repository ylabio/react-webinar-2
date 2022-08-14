import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';
import { translate } from '../../utils/translate';

function ItemArticle({item, onAdd, language}) {
  const cn = bem('ItemArticle');

  const callbacks = {
    onAdd: useCallback((e) => onAdd(item._id), [onAdd, item])
  };

  return (
    <div className={cn()}>
      {item && item.description && <div className={cn('cell')}>
        {item.description}
      </div>}
      {item && item.maidIn && item.maidIn.title && <div className={cn('cell')}>
        {translate(language, 'Made_in')}: <span>{item.maidIn.title}</span>
      </div>}
      {item && item.category && item.category.title && <div className={cn('cell')}>
        {translate(language, 'Category')}: <span>{item.category.title}</span>
      </div>}
      {item && item.edition && <div className={cn('cell')}>
        {translate(language, 'Year_issue')}: <span>{item.edition}</span>
      </div>}
      {item && item.price && <div className={cn('price')}>
        {translate(language, 'Price')}: <span>{numberFormat(item.price)} ₽</span>
      </div>}
      {item && callbacks.onAdd && <div className={cn('cell')}>
        <button onClick={callbacks.onAdd}>{translate(language, 'Add')}</button>
      </div>}
    </div>
  )
}

ItemArticle.propTypes = {
  language: propTypes.string,
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

ItemArticle.defaultProps = {
  language: 'RU',
  onAdd: () => {},
}

export default React.memo(ItemArticle);

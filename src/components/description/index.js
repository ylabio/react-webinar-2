import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import titleLang from "../../utils/titleLang";
import './style.css';

function Description({ lang, item, onAdd }) {
  const cn = bem('Description');

  const callbacks = {
    onAdd: useCallback(() => onAdd(item.dataJson._id), [onAdd, item])
  };

  return (
    <div className={cn()}>
      {item.dataJson ? 
        <>
          <p className={cn('description')}>
            {item.dataJson.description}
          </p>
          <p className={cn('text')}>
            {titleLang(lang, 'country')} <span className={cn('text', { weight:'bold'})}>{item.countryJson.title}</span>
          </p>
          <p className={cn('text')}>
            {titleLang(lang, 'category')} <span className={cn('text', { weight:'bold'})}>{item.categoryJson.title}</span>
          </p>
          <p className={cn('text')}>
            {titleLang(lang, 'year')} <span className={cn('text', { weight:'bold'})}>{item.dataJson.edition}</span>
          </p>
          <p className={cn('price')}>
            {`${titleLang(lang, 'price')} ${numberFormat(item.dataJson.price)} ₽`}
          </p>
          <button onClick={callbacks.onAdd}>{titleLang(lang, 'btnAdd')}</button>
        </> : 
        <h2 className={cn('title')}>Loading...</h2>
      }
    </div>
  )
}

Description.propTypes = {
  lang: propTypes.string.isRequired,
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

Description.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Description);

import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function Description({ words, item, onAdd }) {
  const cn = bem('Description');

  const callbacks = {
    onAdd: useCallback(() => onAdd(item.dataJson._id), [onAdd, item])
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>
        {item.dataJson.description}
      </p>
      <p className={cn('text')}>
        {words.country} <span className={cn('text', { weight:'bold'})}>{item.countryJson.title}</span>
      </p>
      <p className={cn('text')}>
        {words.category} <span className={cn('text', { weight:'bold'})}>{item.categoryJson.title}</span>
      </p>
      <p className={cn('text')}>
        {words.year} <span className={cn('text', { weight:'bold'})}>{item.dataJson.edition}</span>
      </p>
      <p className={cn('price')}>
        {`${words.price} ${numberFormat(item.dataJson.price)} ₽`}
      </p>
      <button onClick={callbacks.onAdd}>{words.btnAdd}</button>
    </div>
  )
}

Description.propTypes = {
  words: propTypes.object.isRequired,
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

Description.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Description);

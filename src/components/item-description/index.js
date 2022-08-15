import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function ItemDescription(props) {
  const cn = bem('ItemDescription');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.item.description}</div>
      <div className={cn('maidIn')}>{props.language.maidIn}: <strong>{props.item.maidIn}</strong></div>
      <div className={cn('category')}>{props.language.category}: <strong>{props.item.category}</strong></div>
      <div className={cn('edition')}>{props.language.edition}: <strong>{props.item.edition}</strong></div>
      <h2 className={cn('price')}>{props.language.price}: {numberFormat(props.item.price)}</h2>
      <button onClick={callbacks.onAdd}>{props.language.add}</button>
    </div>
  )
}

ItemDescription.propTypes = {
  language: propTypes.object.isRequired
}

ItemDescription.defaultProps = {
  onAdd: () => {},
}

export default React.memo(ItemDescription);

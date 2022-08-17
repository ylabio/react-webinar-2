import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/number-format';
import {cn as bem} from "@bem-react/classname";
import localization from './localization';
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    linkFunc: useCallback((e) =>  props.linkFunc(props.item._id), [props.linkFunc, props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
      <span className={props.linkFunc ? cn('link') : ""} onClick={props.linkFunc ? callbacks.linkFunc : null}>
        {props.item.title}
      </span>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {localization[props.lang].pieces}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{localization[props.lang].deleteBtn}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func.isRequired,
  lang: propTypes.string,
  linkFunc: propTypes.func,
}

ItemBasket.defaultProps = {
  lang: "RU",
  linkFunc: null
}

export default React.memo(ItemBasket);

import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import localization from './localization';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
    linkFunc: useCallback((e) => props.linkFunc(props.item._id), [props.linkFunc, props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')}>
        <span className={props.linkFunc ? cn('link') : ""} 
              onClick={props.linkFunc ? callbacks.linkFunc : null}
        >
          {props.item.title}
        </span>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{localization[props.lang].addBtn}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  lang: propTypes.string,
  linkFunc: propTypes.func
}

Item.defaultProps = {
  onAdd: () => {},
  lang: "RU",
  linkFunc: null
}

export default React.memo(Item);

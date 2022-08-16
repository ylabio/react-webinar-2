import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')}>
        {props.link}
      </div>      
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.translate(props.language, 'Add')}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  language: propTypes.string,
  translate: propTypes.func,
  item: propTypes.object.isRequired,
  link: propTypes.node.isRequired,
  onAdd: propTypes.func,
}

Item.defaultProps = {
  language: 'RU',
  translate: (langugage, key) => key,
  onAdd: () => {},
}

export default React.memo(Item);

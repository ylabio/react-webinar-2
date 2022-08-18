import React, {useCallback} from 'react';
import {Link} from "react-router-dom";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  const href = props.item._id ? `/product/${props.item._id}` : '/'

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')}>
        <Link className={cn('link')} to={href}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.words.btnAdd}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  words: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item);

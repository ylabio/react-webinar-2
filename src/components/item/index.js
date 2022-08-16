import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom';
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
				<Link to={`/${props.pathLink}/${props.item._id}`} state={{title: props.item.title, _key: props.item._key}} className={cn('link')}>
          {props.item.title}
				</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
	pathLink: propTypes.string.isRequired
}

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item);

import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import { useParams } from "react-router-dom"
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom'
import numberFormat from "../../utils/number-format";
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item), [props.onAdd, props.item]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <Link className={cn('title')} to={props.link}>
        {props.item.title}
      </Link>
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
}

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item);

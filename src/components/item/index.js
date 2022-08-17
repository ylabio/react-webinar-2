import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <Link to={props.link} className={cn('title')}>
        {props.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.translate('add')}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  translate: propTypes.func,
  title: propTypes.string,
  link: propTypes.string
}

Item.defaultProps = {
  onAdd: () => {},
  translate: () => {},
  link: '/'
}

export default React.memo(Item);

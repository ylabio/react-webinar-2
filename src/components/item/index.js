import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';
import {Link} from 'react-router-dom'
import MLText from '../../utils/mul-lang-text';

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
        <Link to={props.URL+props.item._id} className={cn('link')}>
        {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{MLText('addBtn')}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  URL:propTypes.string
}

Item.defaultProps = {
  onAdd: () => {},
  URL:`/discription/`
}

export default React.memo(Item);

import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';
import {Link} from "react-router-dom"


function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
       <Link to={props.link}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn('button')} onClick={callbacks.onAdd}>{props.translate(props.language, props.codesItem.CODE_8) || 'Добавить'}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  codesItem: propTypes.object.isRequired,
  translate: propTypes.func.isRequired,
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
  language: propTypes.string.isRequired
}

Item.defaultProps = {
  codesItem: {},
  translate: () => {},
  onAdd: () => {},
}

export default React.memo(Item);

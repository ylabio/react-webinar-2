import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import { Link } from "react-router-dom";
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
         <Link to={props.link}>{props.item.title}</Link>
       </div>
      
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn('button')} onClick={callbacks.onAdd}>{props.addButtonName}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
  addButtonName: propTypes.string,
  link: propTypes.string.isRequired
}

Item.defaultProps = {
  addButtonName: 'Добавить'
}

export default React.memo(Item);

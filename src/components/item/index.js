import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import { Link } from "react-router-dom";
import './style.css';
import useSelector from '../../utils/use-selector';

function Item(props) {
  const cn = bem('Item');
  
  const select = useSelector(state => ({
    addButtonName: state.names.names.addButtonName,
    pcsText: state.names.names.pcsText
  }));

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
    pageLoad: useCallback((e) => props.pageLoad(props.item._id), [props.pageLoad, props.item]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
       <div className={cn('title')} onClick={callbacks.pageLoad}>
       <Link to={`/${props.item._id}`}>{props.item.title}</Link>
      </div>
      
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn('button')} onClick={callbacks.onAdd}>{select.addButtonName}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
  pageLoad: propTypes.func.isRequired
}

export default React.memo(Item);

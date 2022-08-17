import React, { useCallback, useContext } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';
import useStore from './../../utils/use-store';
import useSelector from '../../utils/use-selector';

import { Link } from 'react-router-dom';
import { ContextTitle } from './../../store/contextTitle';

function Item(props) {
  const cn = bem('Item');
  const store = useStore()
  const select = useSelector(state => ({
    cuurentItem: state.catalog.cuurentItem,
  }));
  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),

  };
  const { setTitle } = useContext(ContextTitle)
  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')} >
        <Link to={`/info/${props.item._id}`} onClick={() => {
          setTitle(props.item.title);
          localStorage.setItem('title',props.item.title)
        }}>
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

}

Item.defaultProps = {
  onAdd: () => { },

}

export default React.memo(Item);

import React, { useCallback, useContext } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';


import { ContextTitle } from './../../store/contextTitle';
import LinkMenu from '../link-menu';

function Item(props) {
  const cn = bem('Item');

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
        <LinkMenu
          title={props.item.title}
          setTitle={setTitle}
          localStorageKey={'title'}
          localStorageValue={props.item.title}
          path={'/info/'}
          idItem={props.item._id}
        >
          {props.item.title}
        </LinkMenu>

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

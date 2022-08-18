import React, { useCallback, useContext } from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import { cn as bem } from "@bem-react/classname";
import './styles.css';
import useStore from './../../utils/use-store';
import { Link } from 'react-router-dom';
import { ContextTitle } from '../../store/contextTitle';
import LinkMenu from '../link-menu';
function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const store = useStore()
  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item]),
    closeModal: useCallback(() =>props.closeModal(), []),

  };

  const { setTitle } = useContext(ContextTitle)
  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <LinkMenu
          title={props.item.title}
          setTitle={setTitle}
          localStorageKey={'title'}
          localStorageValue={props.item.title}
          path={'/info/'}
          idItem={props.item._id}
          closeModal={callbacks.closeModal}
        >
          {props.item.title}
        </LinkMenu>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>Удалить</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);

import React, {useCallback} from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import useSelector from '../../utils/use-selector';
import LangArr from '../lang-array';
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const select = useSelector(state => ({
    language: state.language.language
  }));

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}> 
        <NavLink to={`${props.item._id}`} className={cn('link')} onClick={props.onClose}>
          {props.item.title}
        </NavLink></div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {LangArr.basketItem.pcs[select.language]}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{LangArr.basketItem.button[select.language]}</button></div>
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

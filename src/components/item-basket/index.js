import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import { cn as bem } from "@bem-react/classname";
import './styles.css';
import { Link } from 'react-router-dom';
import useSelector from '../../utils/use-selector';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item])
  };

  const { remove, pc } = useSelector(select => ({
    remove: select.multilang.CurrentLang.remove,
    pc: select.multilang.CurrentLang.pc
  }))


  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}><Link className='link' state={props.item._id} to="product">{props.item.title}</Link> </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {pc}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{remove}</button></div>
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

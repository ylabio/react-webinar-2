import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import { Link } from 'react-router-dom';
import MLText from '../../utils/mul-lang-text';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onClose: useCallback((e) => props.onClose(), [])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
      <Link to={props.URL+props.item._id} className={cn('link')} onClick={callbacks.onClose}>
        {props.item.title}
        </Link>
        </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {MLText('units')} </div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{MLText('delBtn')}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func,
  URL:propTypes.string
}

ItemBasket.defaultProps = {
item:{},
URL:'/discription/'
}

export default React.memo(ItemBasket);

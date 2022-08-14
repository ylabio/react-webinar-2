import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import { Link } from 'react-router-dom';
import MLText from '../multi-lang/mul-lang-text';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onClose: useCallback((e) => props.onClose(), [])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
      <Link to={`/discription/${props.item._id}`} className={cn('link')} onClick={callbacks.onClose}>
        {props.item.title}
        </Link>
        </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} <MLText item={'units'}/> </div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}><MLText item={'delBtn'}/></button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func,
}

ItemBasket.defaultProps = {
item:{}
}

export default React.memo(ItemBasket);

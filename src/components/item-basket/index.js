import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {Link} from 'react-router-dom';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const callbacks = {
    onRemove: useCallback(() => props.onRemove(props.item._id), [props.onRemove,  props.item])
  };
  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/articles/${props.item._id}`} onClick={props.onClickItem}>
        {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.words.pcs}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.words.remove}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  words: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onClickItem: propTypes.func
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);

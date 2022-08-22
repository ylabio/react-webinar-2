import React, {useCallback} from 'react';
import {Link} from "react-router-dom";
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onClose: useCallback(() => props.onClose(), [props.onClose, props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.onClose}>
        {props.link ? 
          <Link className={cn('link')} onClick={callbacks.onClose} to={props.link}>{props.item.title}</Link> : 
          props.item.title
        }
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.words.pc}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.words.btnDelete}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  link: propTypes.string,
  words: propTypes.object.isRequired,
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);

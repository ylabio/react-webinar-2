import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import translate from "../../utils/translate";
import {Link} from "react-router-dom";

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        {props.link
          ? <Link onClick={props.onClick} to={props.link}>
            {props.item.title}
          </Link>
          : <div>
            {props.item.title}
          </div>
        }
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {translate(props.language, "item-basket-piece")}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{translate(props.language, "item-basket-button")}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onClick: propTypes.func,
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);

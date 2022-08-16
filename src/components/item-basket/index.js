import React, {useCallback} from "react";
import propTypes from "prop-types";
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import "./styles.css";

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item.id), [props.onRemove,  props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <a className={cn('link')}
           href="#"
           onClick={(evt) => {
             evt.preventDefault();
             props.onItemClick(props.item.id)}}>{props.item.title}</a></div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.getTranslation('pieceItem')(props.item.amount) || 'шт'}</div>
        <div className={cn('cell')}>
          <button className={cn('button')}
                  onClick={callbacks.onRemove}>{props.getTranslation('delete') || 'Удалить'}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onItemClick: propTypes.func,
  getTranslation: propTypes.func.isRequired,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onItemClick: () => {},
}

export default React.memo(ItemBasket);

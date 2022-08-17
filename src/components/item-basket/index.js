import React, {useCallback} from "react";
import propTypes from "prop-types";
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import "./styles.css";
import {Link} from "react-router-dom";

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item.id), [props.onRemove,  props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link className={cn('link')}
              to={props.link}>{props.item.title}</Link></div>
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
  getTranslation: propTypes.func.isRequired,
  link: propTypes.string.isRequired,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default React.memo(ItemBasket);

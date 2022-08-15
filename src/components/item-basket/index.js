import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import React, { useCallback } from 'react';
import numberFormat from "../../utils/number-format";
import useLanguage from "../../utils/use-language";
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onTitleClick: useCallback((e) => props.onTitleClick(props.item._id), [props.onTitleClick, props.item])
  };

  const lng = useLanguage();

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.onTitleClick}>
        {props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {lng("things")}</div>
        <div className={cn('cell')}>
          <button className={cn('remove')} onClick={callbacks.onRemove}>{lng("buttonRemove")}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onTitleClick: propTypes.func
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onTitleClick: () => {}
}

export default React.memo(ItemBasket);

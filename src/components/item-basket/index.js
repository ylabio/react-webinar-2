import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import locText from "../../utils/localization";
import numberFormat from "../../utils/number-format";
import useSelector from "../../utils/use-selector";
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onTitleClick: useCallback((e) => props.onTitleClick(props.item._id), [props.onTitleClick, props.item])
  };

  const language = useSelector(state => state.localization.lang);
  useEffect(() => {}, [language]);

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.onTitleClick}>
        {props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {locText("things")}</div>
        <div className={cn('cell')}>
          <button className={cn('remove')} onClick={callbacks.onRemove}>{locText("buttonRemove")}</button>
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

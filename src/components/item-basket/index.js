import React, {useCallback, useContext} from "react";
import propTypes from "prop-types";
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import "./styles.css";
import {LanguageContext} from "../../services/locale/context";
import Translation from "../../services/locale";

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const {language} = useContext(LanguageContext);

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
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {Translation[language].item.piece(props.item.amount)}</div>
        <div className={cn('cell')}>
          <button className={cn('button')}
                  onClick={callbacks.onRemove}>{Translation[language].actions.delete}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onItemClick: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onItemClick: () => {},
}

export default React.memo(ItemBasket);

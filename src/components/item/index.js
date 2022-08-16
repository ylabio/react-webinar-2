import React, {useCallback, useContext} from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";
import {LanguageContext} from "../../services/locale/context";
import Translation from "../../services/locale";

function Item(props) {
  const cn = bem('Item');
  const {language} = useContext(LanguageContext);

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item.id), [props.onAdd, props.item])
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
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn('button')}
                onClick={callbacks.onAdd}>{Translation[language].actions.add}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  onItemClick: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
  onItemClick: () => {},
}

export default React.memo(Item);

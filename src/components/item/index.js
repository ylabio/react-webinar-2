import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';
import { LanguageContext } from "../../services/language/context";
import Translation from "../../services/language";

function Item(props) {
  const cn = bem('Item');
  const { language } = useContext(LanguageContext);


  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item.id), [props.onAdd, props.item]),
  };

  return (
    <div className={cn()}>

      <div className={cn('title')}>
        <Link className={cn('link')}
          to={`/article/${props.item.id}`}>{props.item.title}</Link></div>
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
}

Item.defaultProps = {
  onAdd: () => { },
}

export default React.memo(Item);

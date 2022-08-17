import React, { useCallback, useContext } from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import { cn as bem } from "@bem-react/classname";
import './styles.css';
import { Link } from "react-router-dom";
import { LanguageContext } from "../../services/language/context";
import Translation from "../../services/language";

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const { language } = useContext(LanguageContext);

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item.id), [props.onRemove, props.item]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link className={cn('link')}
          to={`/article/${props.item.id}`}>{props.item.title}</Link></div>
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
}

ItemBasket.defaultProps = {
  onRemove: () => { }
}

export default React.memo(ItemBasket);

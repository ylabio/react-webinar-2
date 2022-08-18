import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';
import translate from "../../utils/translate";
import {Link} from "react-router-dom";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
    <div className={cn('title')}>
      {props.link
        ? <Link to={props.link}>
          {props.item.title}
        </Link>
        : <div>
          {props.item.title}
        </div>
      }
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translate(props.language, "item-button")}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  language: propTypes.string.isRequired
}

Item.defaultProps = {
  onAdd: () => {},
  language: "ru"
}

export default React.memo(Item);

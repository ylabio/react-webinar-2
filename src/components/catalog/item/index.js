import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import numberFormat from "../../../utils/number-format";
import './style.css';

function Item(props) {

  // CSS классы по БЭМ
  const cn = bem('Item');

  const callbacks = {
    // Добавление одной единицы товара в корзину
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {props.link ? <Link to={props.link}>{props.item.title}</Link> : props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} {props.labelCurr}</div>
        <button onClick={callbacks.onAdd}>{props.labelAdd}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  link: propTypes.string,
  labelCurr: propTypes.string,
  labelAdd: propTypes.string
}

Item.defaultProps = {
  onAdd: () => {},
  link: '',
  labelCurr: '₽',
  labelAdd: 'Добавить'
}

export default React.memo(Item);

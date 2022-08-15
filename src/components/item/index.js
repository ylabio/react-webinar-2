import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';
import {Link} from "react-router-dom";

function Item({item, onAdd, itemPageLink}) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => onAdd(item._id), [onAdd, item]),
  };

  return (
    <div className={cn()}>
      <Link to={itemPageLink} className={cn('title')}>
        {item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  itemPageLink: propTypes.string
}

Item.defaultProps = {
  onAdd: () => {},
  itemPageLink: ''
}

export default React.memo(Item);

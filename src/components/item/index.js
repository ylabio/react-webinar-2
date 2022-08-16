import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';
import {Link} from "react-router-dom";

function Item({onAdd, item, ln = {}, link = `/catalog/${item._id}`}) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback(() => onAdd(item._id), [onAdd, item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={link}>
          {item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{ln.add}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  link: propTypes.string,
  onAdd: propTypes.func,
  ln: propTypes.objectOf(propTypes.string).isRequired,
}

Item.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Item);

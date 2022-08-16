import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {Link} from "react-router-dom";

function ItemBasket({item, onRemove, onClose, ln = {}, link = `/catalog/${item._id}`}) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback(() => onRemove(item._id), [onRemove,  item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={link} onClick={onClose}>
          {item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{ln.delete}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  link: propTypes.string,
  onRemove: propTypes.func,
  ln: propTypes.objectOf(propTypes.string).isRequired,
  onClose: propTypes.func
}

ItemBasket.defaultProps = {
 onClose: () => {},
}

export default React.memo(ItemBasket);

import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './styles.css';

function ItemBasket({item, link, onRemove, onLink, labelDelete, labelUnit, labelCurr}) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => onRemove(item._id), [onRemove, item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {link ? <Link onClick={onLink} to={link}>{item.title}</Link> : item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} {labelCurr}</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {labelUnit}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{labelDelete}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  link: propTypes.string,
  onLink: propTypes.func,
  labelCurr: propTypes.string,
  labelDelete: propTypes.string,
  labelUnit: propTypes.string,
}

ItemBasket.defaultProps = {
  onLink: () => {},
  labelCurr: '₽',
  labelUnit: 'шт',
  labelDelete: 'Удалить',
}

export default React.memo(ItemBasket);

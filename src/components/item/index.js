import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import numberFormat from '../../utils/numberFormat';
import './style.css';

function Item({item, onAdd, text, baseUrl}) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback(e => onAdd(item._id), [onAdd, item])
  };

  return (
    <div className={cn()}>
      <Link to={`${baseUrl}/${item._id}`} className={cn('title')}>
        {item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{text.add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  text: propTypes.object.isRequired,
  baseUrl: propTypes.string.isRequired,
  onAdd: propTypes.func.isRequired
};

Item.defaultProps = {
  onAdd: () => {}
};

export default React.memo(Item);

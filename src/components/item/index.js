import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";

import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback(() => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`${props.address.replace(':productNumber', props.item._key)}`} className={cn('link')}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn('add')} onClick={callbacks.onAdd}>
          {props.text.add}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  address: propTypes.string.isRequired,
  text: propTypes.object,
  onAdd: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
  text: {},
}

export default React.memo(Item);

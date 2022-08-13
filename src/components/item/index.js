import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from 'react-router-dom';
import Translate from '../../app/translate';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <Link className={cn('title')} to={props.to + props.item._id}>
        <span className={cn('titleText')}>
          {props.item.title}
        </span>
      </Link>
      <div className={cn('right')}>
        <div className={cn('price')}>
          {props.item.price.toLocaleString(props.lang)} ₽
        </div>
        <button onClick={callbacks.onAdd}>
          <Translate text={'Добавить'} />
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  lang: propTypes.string.isRequired,
  to: propTypes.string.isRequired,
}

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item);

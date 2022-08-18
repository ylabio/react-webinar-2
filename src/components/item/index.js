import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/numberFormat';
import './style.css';
import { Link } from 'react-router-dom';
import translate from '../../utils/translate';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <Link className={cn('title')} to={props.address}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translate(props.language, 'add')}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  address: propTypes.string,
  language: propTypes.string.isRequired,
};

Item.defaultProps = {
  onAdd: () => {},
  address: '/',
};

export default React.memo(Item);

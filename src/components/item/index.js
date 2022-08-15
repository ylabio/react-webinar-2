import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import { useNavigate } from 'react-router-dom';
import useLanguage from '../../utils/use-language';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const navigate = useNavigate();
  const { content } = useLanguage();

  const callbacks = {
    onAdd: useCallback(
      (e) => props.onAdd(props.item._id),
      [props.onAdd, props.item]
    ),
    seeDetails: useCallback(() => {
      navigate(`/products/${props.item._id}`);
    }, [props.item._id]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')} onClick={callbacks.seeDetails}>
        {props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{content.addToCart}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);

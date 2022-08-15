import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/number-format';
import { cn as bem } from '@bem-react/classname';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import useLanguage from '../../utils/use-language';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();
  const { content } = useLanguage();

  const callbacks = {
    onRemove: useCallback(
      (e) => props.onRemove(props.item._id),
      [props.onRemove, props.item]
    ),
    seeDetails: useCallback(() => {
      props.onClose();
      navigate(`/products/${props.item._id}`);
    }, [props.item._id]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.seeDetails}>
        {props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {content.pieces}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{content.deleteFromCart}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
};

export default React.memo(ItemBasket);

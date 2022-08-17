import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import {NavLink} from "react-router-dom";
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <NavLink onClick={props.onCloseModal} to={`/${props.navLink}/${props.item._id}`}>{props.item.title}</NavLink>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.button}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  button: propTypes.string.isRequired,
  navLink: propTypes.string.isRequired,
  onRemove: propTypes.func,
  onCloseModal: propTypes.func,
};

ItemBasket.defaultProps = {};

export default React.memo(ItemBasket);

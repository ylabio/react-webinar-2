import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import {NavLink} from "react-router-dom";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  console.log(props.navLink);

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <NavLink to={`/${props.navLink}/${props.item._id}`}>{props.item.title}</NavLink>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.button}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  button: propTypes.string.isRequired,
  navLink: propTypes.string.isRequired,
  onAdd: propTypes.func,
};

Item.defaultProps = {
  onAdd: () => {
  },
};

export default React.memo(Item);

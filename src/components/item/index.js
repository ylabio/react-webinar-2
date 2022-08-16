import React, {useCallback, useContext} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import {NavLink} from "react-router-dom";
import {LocalisationContext} from "l10n";
import {l10n} from "l10n/strings";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const {lang} = useContext(LocalisationContext);

  const button = l10n.buttons.add[lang];

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <NavLink to={`/${props.navLink}/${props.item._id}`}>{props.item.title}</NavLink>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{button}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  navLink: propTypes.string.isRequired,
  onAdd: propTypes.func,
};

Item.defaultProps = {
  onAdd: () => {
  },
};

export default React.memo(Item);

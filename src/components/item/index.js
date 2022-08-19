import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "utils/number-format";
import './style.css';
import useLanguage from "utils/use-language";

function Item(props) {
  const cn = bem('Item');
  const translation = useLanguage();

  const callbacks = {
    onAdd: useCallback(() => props.onAdd(props.item._id), [props.onAdd, props.item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <span onClick={props.onName} className={cn('link')}>{props.item.title}</span>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translation('add')}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  onName: propTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
  onName: () => {},
};

export default React.memo(Item);

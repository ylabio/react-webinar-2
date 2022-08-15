import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "utils/number-format";
import {useNavigate} from "react-router-dom";
import './style.css';
import useLanguage from "utils/use-language";

function Item(props) {
  const cn = bem('Item');
  const navigate = useNavigate();
  const translation = useLanguage()

  const callbacks = {
    onAdd: useCallback(() => props.onAdd(props.item._id), [props.onAdd, props.item]),
  };

  const onProduct = () => {
    navigate(`/${props.item._id}`)
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')}>
        <span onClick={onProduct} className={cn('link')}>{props.item.title}</span>
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
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);

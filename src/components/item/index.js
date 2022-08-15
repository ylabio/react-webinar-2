import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import { useNavigate } from "react-router-dom";
import numberFormat from "../../utils/number-format";
import useSelector from "../../utils/use-selector";
import localization from './localization';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const navigate = useNavigate();

  const select = useSelector(state => ({
    lang: state.localization.lang
  }));

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')}>
        <span className={cn('link')} onClick={() => navigate(`/item/${props.item._id}`)}>
          {props.item.title}
        </span>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{localization[select.lang].addBtn}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item);

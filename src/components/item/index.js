import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';
import { useNavigate } from 'react-router-dom';
import translate from '../../utils/translate';

function Item(props) {
  const cn = bem('Item');

  const navigate = useNavigate();

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')} onClick={() => navigate(`/${props.addsQuery}/${props.item._id}`)}>
        {props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translate(props.lang, 'Добавить')}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  lang: propTypes.string,
}

Item.defaultProps = {
  lang: 'ru',
  onAdd: () => { },
}

export default React.memo(Item);

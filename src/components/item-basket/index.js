import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import { cn as bem } from "@bem-react/classname";
import './styles.css';
import { useNavigate } from 'react-router-dom';
import translate from '../../utils/translate';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={() => {
        navigate(`/${props.addsQuery}/${props.item._id}`)
        props.closeModal()
      }}>{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {translate(props.lang, 'шт')}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{translate(props.lang, 'Удалить')}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  lang: propTypes.string,
}

ItemBasket.defaultProps = {
  onRemove: () => { },
  lang: 'ru'
}

export default React.memo(ItemBasket);

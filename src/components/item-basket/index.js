import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import titleLang from "../../utils/titleLang";
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const navigate = useNavigate()

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onClose: useCallback(() => {
      props.onClose(),
      navigate(`/product/${props.item._id}`);
    }, [props.onClose, props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.onClose}>
        <span className={cn('text')}>{props.item.title}</span>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {titleLang(props.lang, 'pc')}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{titleLang(props.lang, 'btnDelete')}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  lang: propTypes.string.isRequired,
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);

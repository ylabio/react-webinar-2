import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import numberFormat from "utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import useLanguage from "utils/use-language";

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();
  const translation = useLanguage()

  const callbacks = {
    onRemove: useCallback(() => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onCloseModal: useCallback(() =>props.onCloseModal(), []),
  };

  const onProduct = () => {
    navigate(`/${props.item._id}`)
    callbacks.onCloseModal()
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <span onClick={onProduct} className={cn('link')}>{props.item.title}</span>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {translation('pieces')}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{translation('delete')}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onCloseModal: propTypes.func,
};

ItemBasket.defaultProps = {

};

export default React.memo(ItemBasket);

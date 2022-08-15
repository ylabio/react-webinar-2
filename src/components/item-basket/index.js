import React, {useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import propTypes from 'prop-types';
import numberFormat from '../../utils/number-format';
import {cn as bem} from "@bem-react/classname";
import useSelector from "../../utils/use-selector";
import localization from './localization';
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const select = useSelector(state => ({
    lang: state.localization.lang
  }));
  
  const navigate = useNavigate();

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onClose: useCallback((e) => {
      props.onClose();
      navigate(`/item/${props.item._id}`);
    }, [props.onClose,  props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
      <span className={cn('link')} onClick={callbacks.onClose}>
        {props.item.title}
      </span>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {localization[select.lang].pieces}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{localization[select.lang].deleteBtn}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired
}

export default React.memo(ItemBasket);

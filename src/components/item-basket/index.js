import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import { Link } from 'react-router-dom';
import Translate from '../../app/translate';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    closeModal: useCallback(() => props.closeModal(), []),
  };

  return (
    <div className={cn()}>
      <Link 
        className={cn('title')} to={props.item._id}
        onClick={callbacks.closeModal}
      >
        <span className={cn('titleText')}>
          {props.item.title}
        </span>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('button')}>
          <button onClick={callbacks.onRemove}>
            <Translate text={'Удалить'} />
          </button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);

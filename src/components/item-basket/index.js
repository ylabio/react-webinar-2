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
    multiLangFormater: useCallback(() => {
      if (props.lang === 'ru') {
        return ['шт', 'шт'];
      }

      return ['pc', 'pcs'];
    }, []),
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
        <div className={cn('cell')}>
          {props.item.price.toLocaleString(props.lang)} ₽
        </div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {
            props.item.amount > 1 
              ? callbacks.multiLangFormater()[1]
              : callbacks.multiLangFormater()[0]
          }
        </div>
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

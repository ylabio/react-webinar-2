import React, {useCallback, useEffect} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {Link} from "react-router-dom";
import useStore from "../../utils/use-store";

function ItemBasket(props) {
  const cn = bem('ItemBasket');
    const store = useStore();
  const callbacks = {
        onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
        closeModal: useCallback(() => store.get('modals').close(), []),
  };

  return (
    <div className={cn()}>
        <div className={cn('title')} onClick={callbacks.closeModal}>
            <Link to={props.url} key={props.item._id} >
                {props.item.title}
            </Link>
        </div>

      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>Удалить</button></div>
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

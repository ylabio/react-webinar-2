import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {Link} from "react-router-dom";
import useStore from "../../utils/use-store";

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const store = useStore()

  const callbacks = {
    onRemove: useCallback(() => props.onRemove(props.item._id), [props.onRemove,  props.item]),
      close: useCallback(() => store.get('modals').close('basket'),[props.getId])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')} ><Link to={props.link} onClick={() => callbacks.close()}>
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
    link: propTypes.string
}

ItemBasket.defaultProps = {
link: ''
}

export default React.memo(ItemBasket);

import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  console.log(props)
  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        {props.link}        
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.translate(props.language, 'Delete')}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  language: propTypes.string,
  translate: propTypes.func,
  item: propTypes.object.isRequired,
  link: propTypes.node.isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  language: 'RU',
  translate: (langugage, key) => key,
}

export default React.memo(ItemBasket);

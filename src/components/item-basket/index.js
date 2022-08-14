import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), 
    [props.onRemove,  props.item]),
    openArticle: useCallback((e) => {props.openArticle(props.item._id);
    }, [props.openArticle, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={'/article/'+props.item._id}  className={cn('title__pointer')} onClick={callbacks.openArticle}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.pcs}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.buttonText}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  openArticle: propTypes.func,
  pcs: propTypes.string,
  buttonText: propTypes.string
}

ItemBasket.defaultProps = {
  pcs: 'шт',
  buttonText: 'Удалить'
}

export default React.memo(ItemBasket);

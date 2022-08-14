import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom'
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import { translate } from '../../utils/translate';

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
        <Link to={`/article/${props.item._id}`}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{translate(props.language, 'Delete')}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  language: propTypes.string,
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  language: 'RU'
}

export default React.memo(ItemBasket);

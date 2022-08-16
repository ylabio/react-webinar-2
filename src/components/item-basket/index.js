import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {Link} from 'react-router-dom'
import { langVars } from '../../utils/localisation';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item])
  };

  return (
    <div className={cn()}>
      <Link className={cn('title')} to={props.link} onClick={()=> props.closeModal()}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {langVars.item.pieces[props.lang]}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{langVars.item.deleteBtn[props.lang]}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  link: propTypes.string,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  item: {}
}

export default React.memo(ItemBasket);

import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { dictionaryEnum } from '../../enums/dictionaryEnum';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import useSelector from '../../utils/use-selector';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const select = useSelector(state => ({
	  lang: state.common.language
  }));

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
		  <Link to={`product/${props.item._id}`} className={cn('title')}>
			  {props.item.title[select.lang]}
		  </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {dictionaryEnum.thing[select.lang]}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{dictionaryEnum.delete[select.lang]}</button></div>
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

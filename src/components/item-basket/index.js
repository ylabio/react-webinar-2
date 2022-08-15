import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import useSelector from '../../utils/use-selector';
import './styles.css';

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
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.translate('thing')}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.translate('delete')}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
	translate: propTypes.func
}

ItemBasket.defaultProps = {
	translate: ()=>{}
}

export default React.memo(ItemBasket);

import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {formatPrice} from '../../utils';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
		onCallback: useCallback((e) => {
      props.onCallback(props.item.code);
		}, [props.onCallback])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
			<div className={cn('price')}>
				{formatPrice(props.item.price)} ₽
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onCallback}>
					Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
	onCallback: propTypes.func
}

Item.defaultProps = {
	onCallback: () => {}
}

export default React.memo(Item);

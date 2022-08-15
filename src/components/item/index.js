import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import useSelector from '../../utils/use-selector';

import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback(() => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  const select = useSelector(state => ({
    lang: state.language.value,
  }));

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`${props.address.replace(':productNumber', props.item._key)}`} className={cn('link')}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn('add')} onClick={callbacks.onAdd}>
          {select.lang === 'rus' ? 'Добавить': 'Add'}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  address: propTypes.string.isRequired,
  onAdd: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item);

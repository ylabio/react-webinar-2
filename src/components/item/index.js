import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {divideOnDigits} from '../../utils';
// import plural from 'plural-ru';
import './style.css';

function Item({item, indexItem, buttonName, onItemClick}) {
  const cn = bem('Item');

  const callbacks = {

    onClick: useCallback((e) => {
      e.stopPropagation();
      onItemClick(item.code)
    }, [onItemClick, item])

    // onClick: useCallback(() => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected) {
    //     setCount(count + 1);
    //   }
    // }, [props.onSelect, props.item, setCount, count]),

    // onDelete: useCallback((e) => {
    //   e.stopPropagation();
    //   props.onDelete(props.item.code)
    // }, [props.onDelete,  props.item])
  };

  return (
    // <div className={cn({'selected': props.item.selected})} onClick={callbacks.onClick}>
    <div className={cn()}>
      <div className={cn('name')}>
        <p className={cn('number')}>{indexItem}</p>
        <p className={cn('title')}>{item.title}</p>
          {/*{count ? ` | Выделялось ${count} ${plural(count, 'раз', 'раза', 'раз')}` : null}*/}
      </div>
      <div className={cn('actions')}>
        <p className={cn('data')}>{divideOnDigits(item.price)}</p>
        {item.count && <p className={cn('count')}>{item.count} шт</p>}
        <button onClick={callbacks.onClick}>
          {buttonName}
        </button>
      </div>
    </div>
    // </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  indexItem: propTypes.number.isRequired,
  buttonName: propTypes.string.isRequired,
  onItemClick: propTypes.func.isRequired,
  // onSelect: propTypes.func.isRequired,
  // onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
  item: {},
  buttonName: '',
  indexItem: 1,
  onItemClick: () => {},
  // onSelect: () => {},
  // onDeleted: () => {}
}

export default React.memo(Item);

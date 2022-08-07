import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {divideOnDigits} from '../../utils';
// import plural from 'plural-ru';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {

    onClick: useCallback((e) => {
      e.stopPropagation();
      props.onItemClick(props.item.code)
    }, [props.onClick, props.item])

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
        <p className={cn('number')}>{props.item.code}</p>
        <p className={cn('title')}>{props.item.title}</p>
          {/*{count ? ` | Выделялось ${count} ${plural(count, 'раз', 'раза', 'раз')}` : null}*/}
      </div>
      <div className={cn('actions')}>
        <p className={cn('data')}>{divideOnDigits(props.item.price)} &#8381;
          {/*{new Intl.NumberFormat('ru-RU').format(props.item.price)} &#8381;*/}
        </p>
        {props.item.count && <p className={cn('count')}>{props.item.count} шт</p>}
        <button onClick={callbacks.onClick}>
          {props.buttonName}
        </button>
      </div>
    </div>
    // </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  buttonName: propTypes.string.isRequired,
  onItemClick: propTypes.func.isRequired,
  // onSelect: propTypes.func.isRequired,
  // onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
  item: {},
  buttonName: '',
  onItemClick: () => {},
  // onSelect: () => {},
  // onDeleted: () => {}
}

export default React.memo(Item);

import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({
  item,
  handleBtn,
  btnText
}) {
  const cn = bem('Item');

  const callbacks = {
    handleBtn: useCallback((e) => {
      e.stopPropagation();
      handleBtn(item.code)
    }, [handleBtn, item])
  };

  return (
    <div className={cn({'selected': item.selected})}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        <span>{`${item.price.toLocaleString('ru')} ₽`}</span>
      </div>
      {
        item.count && 
        <div className={cn('count')}>
          {`${item.count} шт.`}
        </div>
      }
      <div className={cn('actions')}>
        <button onClick={callbacks.handleBtn}>
          {btnText}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  handleBtn: propTypes.func,
  btnText: propTypes.string
}

Item.defaultProps = {
  handleBtn: () => {},
  btnText: "Добавить"
}

export default React.memo(Item);

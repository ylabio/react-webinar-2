import React from "react";
import propTypes from 'prop-types';
import './style.css'
import {cn as bem} from "@bem-react/classname";

function ModalItem({item, onDelete}){
  const cn = bem('Item');

  return(
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
        <div className={cn('title')}>{item.title}</div>
        <div className={cn('price')}>{`${Intl.NumberFormat('ru-RU').format(item.price)} ₽`}</div>
        <div className={cn('amount')}>{`${Intl.NumberFormat('ru-RU').format(item.amount)} шт`}</div>
        <div className={cn('actions')}>
          <button onClick={() => onDelete(item.code)}>Удалить</button>
        </div>
    </div>
  )
}

ModalItem.propTypes = {
  item: propTypes.object,
  onDelete: propTypes.func
}

ModalItem.defaultProps = {
  item: {},
  onDelete: () => {}
}

export default React.memo(ModalItem);
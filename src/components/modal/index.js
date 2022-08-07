import React, { useCallback } from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import ModalList from '../modal-list';
import Totalprice from '../totalprice';


function Modal(props) {

  const cn = bem('Modal');

  if (!props.show){
    return null
  }
  
  return (
    <div className={cn('wraper')} onClick={props.onClose}>
      <div className={cn('cart')} onClick={e => e.stopPropagation()}>
        <div className={cn('header')}>
          <h1 className={cn('name')}>Корзина</h1>
          <button className={cn('button')} onClick={props.onClose}> закрыть </button>
        </div>
        {(props.items.length !== 0) 
        ? <div className={cn('content')}>
            <ModalList items={props.items}
                       onDeleteItems={props.onDeleteItems}
            />
          </div>
        : <div className={cn('empty')}>
            <h1>Корзина пуста</h1>
          </div>
        }
        <div className={cn('footer')}>
          <div className={cn('footer_name')}>
            Итого 
          </div>
          <div className={cn('footer_price')}>
            <Totalprice items={props.items} 
                        totalPrice={props.totalPrice}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Modal);

import React from 'react';
import List from "../list";
import { getTotalPrice } from '../../utils.js';
import './style.css';

/**
 * Корзина товаров
 * @param props Передаваемые пропсы
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Bucket({ bucketItems, onCloseBucket, isOpen, ...props }) {
  const classNames = isOpen ? 'Bucket Bucket-open' : 'Bucket';

  return (
    <div className={classNames}>
      <div className='Bucket-overlay' onClick={onCloseBucket}></div>
      <div className='Bucket-content'>
        <header className='Bucket-header'>
          <h1 className='Bucket-title'>Корзина</h1>
          <button className='Bucket-close-btn'
            onClick={onCloseBucket}
          >
            Закрыть
          </button>
        </header>
          <List items={bucketItems}
            {...props}
          />
        <div className='Bucket-total'>
          <span className='Bucket-total-title'>Итого</span> {getTotalPrice(bucketItems).toLocaleString('ru-RU')} ₽
        </div>
      </div>
    </div>
  );
}

export default React.memo(Bucket);
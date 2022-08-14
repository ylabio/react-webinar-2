import React from 'react';
import './style.css';

function AboutItem({ select, add, id }) {
  return (
    <div className='aboutItem'>
      <div className='itemInfo'>{select.description}</div>
      <div className='category'>
        Страна производитель:{' '}
        <span className='thisInfo'>
          {select.madeInTitle}({select.madeInCode})
        </span>
      </div>
      <div className='category'>
        Категория: <span className='thisInfo'>{select.category}</span>
      </div>
      <div className='category'>
        Год выпуска: <span className='thisInfo'>{select.edition}</span>
      </div>
      <div className='price'>Цена: {select.price} ₽</div>
      <button onClick={() => add(id)}>Добавить</button>
    </div>
  );
}

export default React.memo(AboutItem);

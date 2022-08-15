import React from 'react';
import './style.css';

function AboutItem({ select, add, id, words, language }) {
  return (
    <div className='aboutItem'>
      <div className='itemInfo'>{select.description}</div>
      <div className='category'>
        {language === 'ru' ? words.ru.country : words.eng.country}
        <span className='thisInfo'>
          {select.madeInTitle}({select.madeInCode})
        </span>
      </div>
      <div className='category'>
        {language === 'ru' ? words.ru.category : words.eng.category}{' '}
        <span className='thisInfo'>{select.category}</span>
      </div>
      <div className='category'>
        {language === 'ru' ? words.ru.year : words.eng.year}{' '}
        <span className='thisInfo'>{select.edition}</span>
      </div>
      <div className='price'>
        {language === 'ru' ? words.ru.price : words.eng.price} {select.price} ₽
      </div>
      <button onClick={() => add(id)}>
        {language === 'ru' ? words.ru.buttonAdd : words.eng.buttonAdd}
      </button>
    </div>
  );
}

export default React.memo(AboutItem);

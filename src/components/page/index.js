import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import 'style.css';

function Page({addToBasket, item, addButtonName, producingCountry, category, releaseYear, price}) {
  const cn = bem('Page');

  const callbacks = {
    addToBasket: useCallback((e) => addToBasket(item._id), [addToBasket, item])
  };

  return (
    <div className={cn()}>
      {item.title&&<>
               <div className={cn('description')}>
                 {item.description}
               </div>
               <div className={cn('country')}>
                 {producingCountry}:<strong> {item.maidIn.title} ({item.maidIn.code})</strong>
               </div>
               <div className={cn('category')}>
                 {category}:<strong> {item.category.title}</strong>
               </div>
               <div className={cn('edition')}>
                {releaseYear}:<strong> {item.edition}</strong>
               </div>
               <div className={cn('price')}><strong>
                 {price}: {numberFormat(item.price || 0)} ₽</strong>
               </div>
               <div className={cn('actions')}>
                 <button onClick={callbacks.addToBasket}>{addButtonName}</button>
               </div>
             </>       
      }
    </div>
  )
}

Page.propTypes = {
  addToBasket: propTypes.func.isRequired,
  item: propTypes.object,
  addButtonName: propTypes.string,
  producingCountry: propTypes.string,
  category: propTypes.string,
  releaseYear: propTypes.string,
  price: propTypes.string
}

Page.defaultProps = {
  main: 'Главная',
  link: '/',
  addButtonName: 'Добавить',
  producingCountry: 'Страна производитель',
  category: 'Категория',
  releaseYear: 'Год выпуска',
  price: 'Цена'
}

export default React.memo(Page);

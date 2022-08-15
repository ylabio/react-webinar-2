import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ProductCard({id, description, country, category, year, price, addToBasket}) {
  const cn = bem('ProductCard');
  console.log(id)
  return (
    <div className={cn()}>
      <div className={cn('description')}>{description}
      </div>
      <div className={cn('country')}>Страна производитель: <span>{country}</span></div>
      <div className={cn('category')}>Категория: <span>{category}</span></div>
      <div className={cn('year')}>Год выпуска: <span>{year}</span></div>
      <div className={cn('price')}>Цена: {price} ₽</div>
      <button className={cn('addButton')} onClick={()=>addToBasket(id)}>Добавить</button>
    </div>
  )
}

ProductCard.propTypes = {}

ProductCard.defaultProps = {}

export default React.memo(ProductCard);

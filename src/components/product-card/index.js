import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function ProductCard({id, description, country, category, year, price, addToBasket, words}) {
  const cn = bem('ProductCard');
  return (
    <div className={cn()}>
      <div className={cn('description')}>{description}
      </div>
      <div className={cn('country')}>{words.country} <span>{country}</span></div>
      <div className={cn('category')}>{words.category} <span>{category}</span></div>
      <div className={cn('year')}>{words.year} <span>{year}</span></div>
      <div className={cn('price')}>{words.price} {price} ₽</div>
      <button className={cn('addButton')} onClick={() => addToBasket(id)}>{words.add}</button>
    </div>
  )
}

ProductCard.propTypes = {
  id: propTypes.string,
  description: propTypes.string,
  country: propTypes.string,
  category: propTypes.string,
  year: propTypes.number,
  price: propTypes.number,
  addToBasket: propTypes.func
}

ProductCard.defaultProps = {}

export default React.memo(ProductCard);
import React from 'react';
import propTypes, { bool } from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({
  items,
  basketItems,
  isModalActive,
  addItemToBasket,
  onModalTogge,
  onRemoveItemFromBasket
}) {
  const cn = bem('List');
  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item
          item={item}
          basketItems={basketItems}
          addItemToBasket={addItemToBasket}
          isModalActive={isModalActive}
          onModalTogge={onModalTogge}
          onRemoveItemFromBasket={onRemoveItemFromBasket}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired, // Обязательное свойство - массив товаров в корзие или  массив уникальных товаров в корзие
  basketItems: propTypes.arrayOf(propTypes.object).isRequired, // Обязательное свойство - массив всех товаров в корзие
  isModalActive: bool.isRequired, // Обязательное свойство - флаг модального окна
  addItemToBasket: propTypes.func.isRequired, // Обязательное свойство - функция добавления товара в корзину
  onModalTogge: propTypes.func.isRequired, // Обязательное свойство - функция переключения флаг модального окна
  onRemoveItemFromBasket: propTypes.func.isRequired, // Обязательное свойство - функция удаления товара из корзины по его коду
}

List.defaultProps = {
  items: [],
  basketItems: [],
  isModalActive: false,
  addItemToBasket: () => { },
  onModalTogge: () => { },
  onRemoveItemFromBasket: () => { },
}

export default React.memo(List);
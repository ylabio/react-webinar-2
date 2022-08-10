import React from 'react';
import propTypes, { bool } from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({
  items,
  isModalActive,
  addItemToBasket,
  onRemoveItemFromBasket,
}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item
          item={item}
          isModalActive={isModalActive}
          addItemToBasket={addItemToBasket}
          onRemoveItemFromBasket={onRemoveItemFromBasket}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired, // Обязательное свойство - массив товаров в корзие или массив всех товаров вообще
  isModalActive: bool.isRequired, // Обязательное свойство - флаг модального окна
  addItemToBasket: propTypes.func.isRequired, // Обязательное свойство - функция добавления товара в корзину
  onRemoveItemFromBasket: propTypes.func.isRequired, // Обязательное свойство - функция удаления товара из корзины по его коду
}

List.defaultProps = {
  items: [],
  isModalActive: false,
  addItemToBasket: () => { },
  onRemoveItemFromBasket: () => { },
}

export default React.memo(List);
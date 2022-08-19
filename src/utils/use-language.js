import React, {useCallback} from "react";
import useSelector from "use-selector";

const TRANSLATION_RUS = {
  shop: 'Магазин',
  home: ' Главная',
  basket: 'Корзина',
  inBasket: 'В корзине',
  product: 'товар',
  product2: 'товара',
  product5: 'товаров',
  empty: 'пусто',
  go: 'Перейти',
  add: 'Добавить',
  pieces: 'шт',
  total: 'Итого',
  delete: 'Удалить',
  producingCountry: 'Страна производитель',
  category: 'Категория',
  yearOfIssue: 'Год выпуска',
  price: 'Цена',
  close: 'Закрыть',
  notFounts: 'Не найдено',
}

const TRANSLATION_ENG = {
  shop: 'Shop',
  home: ' Home',
  basket: 'Basket',
  inBasket: 'In Basket',
  product: 'product',
  product2: 'products',
  product5: 'products',
  empty: 'empty',
  go: 'Go',
  add: 'Add',
  pieces: 'psc',
  total: 'Total',
  delete: 'Delete',
  producingCountry: 'Producing Country',
  category: 'Category',
  yearOfIssue: 'Year of issue',
  price: 'Price',
  close: 'Close',
  notFounts: 'Not founts',
}

const LANGUAGES = {
  ru: TRANSLATION_RUS,
  en: TRANSLATION_ENG,
}

/**
 * Хук локализации
 * @return function
 */

const useLanguage = () => {
  const select = useSelector(state => ({
    language: state.language.language,
  }));

  const translations = LANGUAGES[select.language]

  return useCallback((text) => {
    const textTranslation = translations[text]
    if (!textTranslation) {
      return 'Error, no translation'
    }
    return textTranslation
  },[select.language])
};

export default useLanguage;


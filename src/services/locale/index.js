import plural from "plural-ru";

const vocabulary = {
  ru: {
    shop: 'Магазин',
    homeLink: 'Главная',
    basketModal: 'Корзина',
    basketSimple: 'В корзине:',
    empty: 'пусто',
    total: 'Итого',
    open: 'Перейти',
    close: 'Закрыть',
    add: 'Добавить',
    delete: 'Удалить',
    loading: 'Данные звгружаются...',
    country: 'Страна производитель',
    category: 'Категория',
    edition: 'Год выпуска',
    price: 'Цена',
    piece: (value) => plural(value, 'товар', 'товара', 'товаров'),
    pieceItem: () => 'шт',
  },
  en: {
    shop: 'Shop',
    homeLink: 'Home',
    basketModal: 'Cart',
    basketSimple: 'Cart:',
    empty: 'empty',
    total: 'Total',
    open: 'Open',
    close: 'Close',
    add: 'Add',
    delete: 'Delete',
    loading: 'Loading...',
    country: 'Origin',
    category: 'Category',
    edition: 'Edition',
    price: 'Price',
    piece: (value) => value > 1 ? 'pcs' : 'pc',
    pieceItem: (value) => value > 1 ? 'pcs' : 'pc',
  },
}

export default function getTranslation(language, code) {
  return vocabulary[language][code];
}

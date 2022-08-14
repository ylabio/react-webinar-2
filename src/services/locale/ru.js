import plural from "plural-ru";

export default {
  main: {
    title: 'Магазин',
  },
  basket: {
    title: 'Корзина',
    total: 'Итого',
    piece: (value) => plural(value, 'товар', 'товара', 'товаров'),
    empty: 'пусто',
    simple: 'В корзине:',
  },
  item: {
    country: 'Страна производитель',
    category: 'Категория',
    edition: 'Год выпуска',
    price: 'Цена',
    piece: () => 'шт',
  },
  actions: {
    home: 'Главная',
    open: 'Перейти',
    close: 'Закрыть',
    delete: 'Удалить',
    add: 'Добавить',
  },
  loading: 'Данные звгружаются...',
}

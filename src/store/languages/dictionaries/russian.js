import plural from 'plural-ru';

export const russianDict = {
  store: "Магазин",
  mainPage: "Главная",
  empty: "Пусто",
  inCart: "В корзине",
  goCart: "Перейти",
  summary: "Итого",
  remove: "Удалить",
  add: "Добавить",
  manufacturer: "Страна производитель",
  productionYear: "Год выпуска",
  category: "Категория",
  price: "Цена",
  cart: "Корзина",
  close: "Закрыть",
  loading: "Загрузка...",
  goods: (amount) => {
    return plural(amount, 'товар', 'товара', 'товаров')
  },
  pcs: "шт",
  thisLanguage: "Русский"
}

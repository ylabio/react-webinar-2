import plural from 'plural-ru';

export const localization = {
  russian: {
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
    }
  },
  english: {
    store: "Store",
    mainPage: "Main page",
    empty: "Empty",
    inCart: "Cart",
    goCart: "Check out",
    summary: "Summary",
    remove: "Remove",
    add: "Add",
    manufacturer: "Manufacturer",
    productionYear: "Year of production",
    category: "Category",
    price: "Price",
    cart: "Cart",
    close: "Close",
    loading: "Loading...",
    goods: (amount) => {
      if(amount === 1){
        return 'good'
      } else {
        return 'goods'
      }
    }
  }
}
const languages = {
  ru: {
    SHOP: 'Магазин',
    MAIN_PAGE: 'Главная',
    GO_TO_CART: 'Перейти',
    ADD: 'Добавить',
    RUS: 'Рус',
    ENG: 'Англ',
    EMPTY_PAGE: 'Такой страницы не существует',
    BASKET: 'Корзина',
    IN_BASKET: 'В корзине:',
    CLOSE: 'Закрыть',
    DELETE: 'Удалить',
    TOTAL: 'Итого',
    COUNTRY_MANUFACTURER: 'Страна производитель:',
    CATEGORY: 'Категория:',
    YEAR_MANUFACTURER: 'Год выпуска:',
    PRICE: 'Цена:',
    MODAL: 'Модалка',
  },
  eng: {
    SHOP: 'Shop',
    MAIN_PAGE: 'Home',
    GO_TO_CART: 'Go to cart',
    ADD: 'Add in cart',
    RUS: 'Rus',
    ENG: 'Eng',
    EMPTY_PAGE: 'Page does not exist',
    BASKET: 'Basket',
    IN_BASKET: 'In basket:',
    CLOSE: 'Close',
    DELETE: 'Delete',
    TOTAL: 'Total',
    COUNTRY_MANUFACTURER: 'Producting country:',
    CATEGORY: 'Category:',
    YEAR_MANUFACTURER: 'Year of manufacture:',
    PRICE: 'Price:',
    MODAL: 'Modal'
  }
}

const changeLanguage = (language, text) => {
  return languages[language][text]
}

export default changeLanguage;
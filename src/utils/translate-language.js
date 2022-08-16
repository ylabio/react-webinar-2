/**
 * Возвращает объект в зависимости от языка
 */

export function translateLanguage(lang) {
  return {
    shop: lang === 'ru' ? 'Магазин' : lang === 'en' ? 'Shop' : null,
    inCart: lang === 'ru' ? 'В корзине:' : lang === 'en' ? 'In the cart:' : null,
    empty: lang === 'ru' ? 'пусто' : lang === 'en' ? 'empty' : null,
    goTo: lang === 'ru' ? 'Перейти' : lang === 'en' ? 'Go to cart' : null,
    add: lang === 'ru' ? 'Добавить' : lang === 'en' ? 'Add' : null,
    main: lang === 'ru' ? 'Главная' : lang === 'en' ? 'Main page' : null,
    close: lang === 'ru' ? 'Закрыть' : lang === 'en' ? 'Close' : null,
    total: lang === 'ru' ? 'Итого' : lang === 'en' ? 'Total' : null,
    item: lang === 'ru' ? 'товар' : lang === 'en' ? 'item' : null,
    country: lang === 'ru' ? 'Страна производитель:' : lang === 'en' ? 'Made In:' : null,
    category: lang === 'ru' ? 'Категория:' : lang === 'en' ? 'Category:' : null,
    year: lang === 'ru' ? 'Год выпуска' : lang === 'en' ? 'Product year:' : null,
    price: lang === 'ru' ? 'Цена' : lang === 'en' ? 'Price:' : null,
    pcs: lang === 'ru' ? 'шт' : lang === 'en' ? 'pcs' : null,
    delete: lang === 'ru' ? 'Удалить' : lang === 'en' ? 'Delete' : null,
    cart: lang === 'ru' ? 'Корзина' : lang === 'en' ? 'Cart' : null,
  }
}
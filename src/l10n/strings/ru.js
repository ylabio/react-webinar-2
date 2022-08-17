export const ru = {
  title: 'Магазин',
  layout: {
    navigation: {
      home: 'Главная',
    },
    languageSwitcher: {
      heading: 'Язык',
    },
    buttons: {
      add: 'Добавить',
      checkout: 'Перейти',
      remove: 'Удалить',
      close: 'Закрыть',
    }
  },
  cart: {
    title: 'Корзина',
    heading: 'В корзине',
    empty: 'Пусто',
    plural: ['товар', 'товара', 'товаров'],
    total: 'Итого',
    get buttonCheckout() {
      return ru.layout.buttons.checkout;
    },
    get buttonClose() {
      return ru.layout.buttons.close;
    },
  },
  product: {
    card: {
      madeIn: 'Страна производитель',
      category: 'Категория',
      edition: 'Год выпуска',
      price: 'Цена',
      button: 'Добавить'
    }
  },
};



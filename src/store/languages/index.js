import StateModule from "../module";

/**
 * Состояние каталога
 */
class Languages extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
    lang: 'Ru',
    store: 'Магазин',
    main: 'Главная',
    inCart: 'В корзине',
    cart: 'Корзина',
    empty: 'пусто',
    open: 'Перейти',
    add: 'Добавить',
    delete: 'Удалить',
    close: 'Закрыть',
    product: 'товар',
    prod: 'товара',
    products: 'товаров',
    pcs: 'шт',
    madeIn: 'Страна производитель',
    category: 'Категория',
    productionYear: 'Год выпуска',
    price: 'Цена',
    select: 'Выберите язык',
    total: 'Итого',
    };
  }

  /**
   * Перевод
   */

  translateRu() {
    this.setState({
      lang: 'Ru',
      store: 'Магазин',
      main: 'Главная',
      inCart: 'В корзине',
      cart: 'Корзина',
      empty: 'пусто',
      open: 'Перейти',
      add: 'Добавить',
      delete: 'Удалить',
      close: 'Закрыть',
      product: 'товар',
      prod: 'товара',
      products: 'товаров',
      pcs: 'шт',
      madeIn: 'Страна производитель',
      category: 'Категория',
      productionYear: 'Год выпуска',
      price: 'Цена',
      select: 'Выберите язык',
      total: 'Итого',
    })
  }

  translateEn() {
    this.setState({
      lang: 'En',
      store: 'Market',
      main: 'Main',
      inCart: 'Cart',
      cart: 'Cart',
      empty: 'empty',
      open: 'Open',
      add: 'Add',
      delete: 'Delete',
      close: 'Close',
      product: 'product',
      prod: 'products',
      products: 'products',
      pcs: 'pcs',
      madeIn: 'Made in',
      category: 'Category',
      productionYear: 'Production Year',
      price: 'Price',
      select: 'Select language',
      total: 'Total',
    })
  }

}

export default Languages;
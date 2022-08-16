import StateModule from "../module";
import languages from "../../languages";

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

  async translate(language) {
    this.setState({
      ...languages[language]
    });
  }
  }

export default Languages;
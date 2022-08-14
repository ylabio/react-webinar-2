import StateModule from "../module";
import plural from "plural-ru";

/**
 * Управление модальными окнами
 */
class LanguageState extends StateModule {
  initState() {
    return {
      currentLanguage: "ru",
      ru: {
        title: "Магазин",
        basketSimple: {
          inBasket: "В корзине:",
          empty: "пусто",
          products: (amount) => plural(amount, "товар", "товара", "товаров"),
          toBasket: "Перейти",
        },
        buttons: {
          add: "Добавь",
          close: "Закрыть",
          delete: "Удалить",
        },
        basket: {
          title: "Корзина",
          total: "Итого",
          psc: "шт",
        },
        product: {
          main: "Главная ",
          mainID: "Страна производитель: ",
          category: "Категория: ",
          edition: "Год выпуска: ",
          price: "Цена: ",
        },
      },
      en: {
        title: "Shop",
        basketSimple: {
          inBasket: "In basket:",
          products: (amount) => (amount > 1 ? "products" : "product"),
          empty: "empty",
          toBasket: "Go to",
        },
        buttons: {
          add: "Add",
          close: "Close",
          delete: "Delete",
        },
        basket: {
          title: "Basket",
          total: "Total",
          psc: "psc",
        },
        product: {
          main: "Main",
          mainID: "Producing country: ",
          category: "Category: ",
          edition: "Release year: ",
          price: "Price: ",
        },
      },
    };
  }

  setLanguage(lang) {
    this.setState({
      ...this.getState(),
      currentLanguage: lang,
    });
  }
}

export default LanguageState;

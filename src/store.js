import { calculateCount, calculatePrice, changeNumber } from "./utils";
import plural from "plural-ru";

class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listeners = [];
  }

  /**
   * Выбор state
   * @return {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const listener of this.listeners) {
      listener();
    }
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   * @return {Function} Функция для отписки
   */
  subscribe(callback) {
    this.listeners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== callback);
    };
  }

  /**
   * Добавление записи в корзину по её коду
   * @param code
   */
  addItem(code) {
    if (this.state.card.find((item) => item.code === code)) {
      this.setState({
        ...this.state,
        card: this.state.card.map((item) => {
          if (item.code === code) {
            // Подобный товар есть в корзине
            return {
              code,
              title: item.title,
              price: item.price,
              count: item.count + 1,
            };
          }
          return item;
        }),
      });
    } else {
      // Подобного товара нет в корзине
      const newItem = this.state.items.find((item) => item.code === code);
      this.setState({
        ...this.state,

        card: this.state.card.concat({
          code,
          title: newItem.title,
          price: newItem.price,
          count: 1,
        }),
      });
    }
    this.setState({
      ...this.state,

      info:
        this.state.card.length === 0
          ? "пусто"
          : `${calculateCount(this.state.card)} ${plural(
              calculateCount(this.state.card),
              "товар",
              "товара",
              "товаров"
            )} / ${changeNumber(calculatePrice(this.state.card))} ₽`,
    });
  }

  onModalClose() {
    // Закрытие модалки
    this.setState({
      ...this.state,
      modal: false,
    });
  }
  showModal() {
    // Открытие модалки
    this.setState({
      ...this.state,
      modal: true,
    });
  }

  /**
   * Удаление записи из корзины по её коду
   * @param code
   */
  deleteCardItem(code) {
    this.setState({
      ...this.state,
      card: this.state.card.filter((item) => item.code !== code),
    });

    this.setState({
      ...this.state,
      info:
        this.state.card.length == 0
          ? "пусто"
          : `${calculateCount(this.state.card)} ${plural(
              calculateCount(this.state.card),
              "товар",
              "товара",
              "товаров"
            )} / ${changeNumber(calculatePrice(this.state.card))} ₽`,
    });
    console.log(this.state);
  }
}

export default Store;

import StateModule from "../module";
import Api from "../../services/API";
import LocalStorage from "../../services/local-storage";

const localStorageService = new LocalStorage();

const api = new Api();

/**
 * Состояние корзины
 */
class BasketState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: localStorageService.getItems(),
      sum: localStorageService.getSumValue(),
      amount: localStorageService.getAmountValue(),
    };
  }

  /**
   * Добавление товара в корзину
   * @param id Код товара
   */
  async addToBasket(id) {
    let sum = 0;
    // Ищем товар в корзие, чтобы увеличить его количество. Заодно получаем новый массив items

    let exists = false;

    const items = this.getState().items.map(item => {
      let result = item;
      // Искомый товар для увеличения его количества
      if (item.id === id) {
        exists = true;
        result = { ...item, amount: item.amount + 1 };
      }
      // Добавляея в общую сумму
      sum += result.price * result.amount;
      return result
    });

    // Если товар не был найден в корзине, то добавляем его из каталога
    if (!exists) {
      // Поиск товара в каталоге, чтобы его в корзину добавить
      // @todo В реальных приложения будет запрос к АПИ на добавление в корзину, и апи выдаст объект товара..
      const item = this.store.getState().catalog.items.length ?
        this.store.getState().catalog.items.find(item => item.id === id) :
        await api.getArticle(id);

      items.push({ ...item, amount: 1 });
      // Досчитываем сумму
      sum += item.price;
    }

    localStorageService.setBasketValues(items, sum);

    // Установка состояние, basket тоже нужно сделать новым
    this.setState({
      items,
      sum,
      amount: items.length
    }, 'Добавление в корзину');
  }

  /**
   * Добавление товара в корзину
   * @param id Код товара
   */
  removeFromBasket(id) {
    let sum = 0;

    const items = this.getState().items.filter(item => {
      // Удаляемый товар
      if (item.id === id) return false
      // Подсчёт суммы если твоар не удаляем.
      sum += item.price * item.amount;
      return true;
    });

    localStorageService.setBasketValues(items, sum);

    this.setState({
      items,
      sum,
      amount: items.length
    }, 'Удаление из корзины')
  }
}

export default BasketState;

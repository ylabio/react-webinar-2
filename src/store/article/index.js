import StateModule from "../module";
import {basket} from "../exports";

/**
 * Состояние каталога
 */
class ArticleState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {},
      country: '',
      code: '',
      category: '',
    };
  }

  /**
   * Пагинация
   */

  async load(id){
    const response = await
      fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      item: json.result,
      country: json.result.maidIn.title,
      code: json.result.maidIn.code,
      category: json.result.category.title,
    });
  }

  /**
   * Добавление товара в корзину из карточки товара(после обновления страницы)
   */

  addToBasket(id) {

    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество. Заодно получаем новый массив items
    let exists = false;
    const items = this.store.getState().basket.items.map(item => {
      let result = item;
      // Искомый товар для увеличения его количества
      if (item._id === id) {
        exists = true;
        result = {...item, amount: item.amount + 1};
      }
      // Добавляея в общую сумму
      sum += result.price * result.amount;
      return result
    });

    // Если товар не был найден в корзине, то добавляем его из каталога
    if (!exists) {
      // Поиск товара в каталоге, чтобы его в корзину добавить
      // @todo В реальных приложения будет запрос к АПИ на добавление в корзину, и апи выдаст объект товара..
      const item = this.store.getState().article.item;
      items.push({...item, amount: 1});
      // Досчитываем сумму
      sum += item.price;
    }

    // Установка состояние, basket тоже нужно сделать новым
    this.store.setState({
      ...this.store.getState(),
      basket: {
        items,
        sum,
        amount: items.length
      }
    }, 'Добавление в корзину');

  }
}

export default ArticleState;

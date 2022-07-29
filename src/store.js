// импортирую уже готовый счетчик для подсчета "выделений".
import { counterSelected } from './utils';
class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listners = [];
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
    for (const lister of this.listners) {
      lister();
    }
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   * @return {Function} Функция для отписки
   */
  subscribe(callback) {
    this.listners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listners = this.listners.filter(item => item !== callback);
    }
  }

  /**
   * Создание записи
   */

  // Добавил новый параметр numSelected по умолчанию значение 0
  createItem({ code, title = 'Новая запись', selected = false, numSelected = 0 }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, selected, numSelected })
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.filter(item => item.code !== code)
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map(item => {

        if (item.code === code) {
          item.selected = !item.selected;
          // добавления объекту поля numSelected для подсчета "выделений" + небольшое улучшение для точности
          item.numSelected = item.selected ? ++item.numSelected : item.numSelected;
        }
        // дополняем конструкцию управления if конструкцией else для добавления объекту поля selected: false
        else {
          item.selected = false;
        }

        return item;
      })
    });
  }

}

export default Store;

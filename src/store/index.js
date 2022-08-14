import * as modules from './exports.js';

class Store {

  constructor() {
    // Состояние приложения (данные)
    this.state = {};
    // Слушатели изменений state
    this.listeners = [];

    // Модули
    this.modules = {};
    for (const name of Object.keys(modules)) {
      // Экземпляр модуля. Передаём ему ссылку на store и навзание модуля.
      this.modules[name] = new modules[name](this, name);  //создаем новый класс передавая store и имя (смотри ""./module.js)
      // По названию модля устанавливается свойство с нанчальным состоянием от модуля
      this.state[name] = this.modules[name].initState();
    }
  }

  /**
   * Доступ к модулю состояния
   * @param name {String} Название модуля
   */
  get(name){
    return this.modules[name];
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
   * @param [description] {String} Описание действия для логирования
   */
  setState(newState, description = 'setState') {

    console.group(
      `%c${'store.setState'} ${description}`,
      `color: ${'#777'}; font-weight: normal`,
    );
    console.log(`%c${'prev:'}`, `color: ${'#d77332'}`, this.state);
    console.log(`%c${'next:'}`, `color: ${'#2fa827'}`, newState);
    console.groupEnd();

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
      console.log("unSub")
      this.listeners = this.listeners.filter(item => item !== callback);
    }
  }
}

export default Store;

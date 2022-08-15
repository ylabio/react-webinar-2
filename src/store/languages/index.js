import StateModule from '../module';
import translations from './translations.json';

class LanguageState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
   initState() {
    return {
      languageName: 'Русский',
      shop: 'Магазин',
      mainPage: 'Главная',
      inBasket: 'В корзине',
      empty: 'Пусто',
      goBasket: 'Перейти',
      basket: 'Корзина',
      add: 'Добавить',
      remove: 'Удалить',
      total: 'Итого',
      close: 'Закрыть',
      maidIn: 'Страна производитель',
      category: 'Категория',
      edition: 'Год выпуска',
      price: 'Цена',
    };
  }

  changeLanguage() {
    if (this.getState().languageName == 'Русский'){
      this.setState({
        ...this.getState(),
        ...translations.english
      }, 'Смена языка на английский');
    }
    else {
      this.setState({
        ...this.getState(),
        ...translations.russian
      }, 'Смена языка на русский');
    }
  }
}

export default LanguageState;

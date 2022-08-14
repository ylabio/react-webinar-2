import pluralEn from 'plural';
import pluralRu from 'plural-ru';
import StateModule from '../module';

/**
 * Управление модальными окнами
 */
class LocalizationState extends StateModule {
  initState() {
    return {
      lang: 'en',
      dict: {
        ru: {
          catalog: {
            header: 'Магазин'
          },
          basket: {
            header: 'Корзина',
            totalLabel: 'Итого',
            piece: 'шт'
          },
          itemInfo: {
            country: 'Страна производитель',
            category: 'Категория',
            edition: 'Год выпуска',
            price: 'Цена'
          },
          common: {
            homeLink: 'Главная',
            openCart: 'Перейти',
            basketFullnessLabel: 'В корзине',
            basketEmpty: 'Пусто',
            basketAmount: amount => pluralRu(amount, 'товар', 'товара', 'товаров'),
            close: 'Закрыть',
            add: 'Добавить',
            remove: 'Удалить'
          }
        },
        en: {
          catalog: {
            header: 'Shop'
          },
          basket: {
            header: 'Basket',
            totalLabel: 'Total',
            piece: 'pc'
          },
          itemInfo: {
            country: 'Country of origin',
            category: 'Category',
            edition: 'Edition',
            price: 'Price'
          },
          common: {
            homeLink: 'Home',
            openCart: 'Open',
            basketFullnessLabel: 'In the bucket',
            basketEmpty: 'Is empty',
            basketAmount: amount => pluralEn('item', amount),
            close: 'Close',
            add: 'Add',
            remove: 'Remove'
          }
        }
      }
    };
  }

  setLang(lang) {
    this.setState({
      ...this.getState(),
      lang: lang
    });
  }
}

export default LocalizationState;

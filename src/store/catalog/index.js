import buildCategoryArray from '../../utils/get-category-array';
import StateModule from '../module';
import qs from 'qs';

const QS_OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: 'comma',
    encode: false
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true
  }
};

/**
 * Состояние каталога
 */
class CatalogState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      categories: [
        { value: '*', title: 'Все' }
      ],
      count: 0,
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: '*'
      },
      waiting: false,
      link: ''
    };
  }

  /**
   * Инициализация параметров
   * Восстановление из query string адреса
   * Подгрузка и установка категорий товаров
   * @param params
   * @return {Promise<void>}
   */
  async initParams(params = {}) {
    // Параметры из URl. Их нужно валидировать, приводить типы и брать только нужные
    const urlParams = qs.parse(window.location.search, QS_OPTIONS.parse) || {};
    let validParams = {};
    if (urlParams.page) validParams.page = Number(urlParams.page) || 1;
    if (urlParams.limit) validParams.limit = Number(urlParams.limit) || 10;
    if (urlParams.category) validParams.category = urlParams.category;
    if (urlParams.sort) validParams.sort = urlParams.sort;
    if (urlParams.query) validParams.query = urlParams.query;

    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...validParams, ...params };

    // Подгрузка и установка категорий товаров
    const response = await fetch('/api/v1/categories?limit=*');
    const json = await response.json();
    const categories = buildCategoryArray(json.result.items);
    this.setState({
      ...this.getState(),
      categories: [...this.initState().categories, ...categories]
    });

    // Установка параметров и подгрузка данных
    await this.setParams(newParams, true);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param params
   * @param historyReplace {Boolean} Заменить адрес (true) или сделает новую запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(params = {}, historyReplace = false) {
    const newParams = { ...this.getState().params, ...params };

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params: newParams,
      waiting: true
    });

    const skip = (newParams.page - 1) * newParams.limit;
    const apiParams = {
      limit: newParams.limit,
      skip,
      sort: newParams.sort,
      'search[query]': newParams.query
    };
    let apiUrl = new URL(window.location.origin + '/api/v1/articles?fields=items(*),count');
    for (let apiParamsKey in apiParams) {
      apiUrl.searchParams.set(apiParamsKey, apiParams[apiParamsKey]);
    }
    if (newParams.category !== '*') apiUrl.searchParams.set('search[category]', newParams.category);
    const response = await fetch(apiUrl);
    const json = await response.json();

    // Создание ссылки для открытия в новой вкладке
    const linkParams = Object.assign({}, newParams);
    if (linkParams.page) delete linkParams.page;
    const link = qs.stringify(linkParams, QS_OPTIONS.stringify);

    // Установка полученных данных и ссылки, сброс признака загрузки
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
      waiting: false,
      link: link.slice(1)
    });

    /* Не запоминаем параметры в URL, если был сделан клик по номеру страницы, так как переход по ссылке
     автоматически попадает в history */
    if (Object.keys(params).length === 1 && params.page) return;

    // Запоминаем параметры в URL
    let queryString = qs.stringify(newParams, QS_OPTIONS.stringify);
    const url = window.location.pathname + queryString + window.location.hash;
    if (historyReplace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
  }

  /**
   * Сброс параметров к начальным
   * @param params
   * @return {Promise<void>}
   */
  async resetParams(params = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...params };
    // Установка параметров и подгрузка данных
    await this.setParams(newParams);
  }
}

export default CatalogState;

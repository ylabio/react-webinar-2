import StateModule from "../module";
import qs from 'qs';
import sortCategory from "../../utils/sort-category";
import getTree from "../../utils/get-tree";

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
}

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
      count: 0,
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: 'all'
      },
      waiting: false,
      category: null
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из query string адреса
   * @param params
   * @return {Promise<void>}
   */
  async initParams(params = {}) {
    // Параметры из URl. Их нужно валидирвать, приводить типы и брать толкьо нужные
    const urlParams = qs.parse(window.location.search, QS_OPTIONS.parse) || {}
    let validParams = {};
    if (urlParams.page) validParams.page = Number(urlParams.page) || 1;
    if (urlParams.limit) validParams.limit = Number(urlParams.limit) || 10;
    if (urlParams.sort) validParams.sort = urlParams.sort;
    if (urlParams.query) validParams.query = urlParams.query;

    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...validParams, ...params };
    // Установка параметров и подгрузка данных
    await this.setParams(newParams, true);
  }

  /**
   * Сброс параметров к начальным
   * @param params
   * @return {Promise<void>}
   */
  async resetParams(params = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...params };
    // Установк параметров и подгрузка данных
    await this.setParams(newParams);
  }

  async setCategoryList() {

    const response = await fetch('/api/v1/categories')
    const json = await response.json();
    json.result.items.forEach(value => {
      if (!value.parent) {
        value['parent'] = {
          _id: 0
        }
      }
    })
    const tree = getTree(json.result.items, '_id',);
    const arrayCategory = sortCategory(tree[0]['children'], -1, [])
    this.setState({
      ...this.getState(),
      category: [{
        title: "Все",
        value: 'all'
      }, ...arrayCategory]
    })
  }
  /**
   * Устанвока параметров и загрузка списка товаров
   * @param params
   * @param historyReplace {Boolean} Заменить адрес (true) или сделаит новую запис в истории браузера (false)
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
    const response = await fetch(`/api/v1/articles?${newParams.category !== 'all' ? `search%5Bcategory%5D=${newParams.category}&` : ""}limit=${newParams.limit}&skip=${skip}&fields=items(*),count&sort=${newParams.sort}&search[query]=${newParams.query}`);
    const json = await response.json();
    // Установка полученных данных и сброс признака загрузки
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
      waiting: false
    });

    // Запоминаем параметры в URL
    let queryString = qs.stringify(newParams, QS_OPTIONS.stringify);
    const url = window.location.pathname + queryString + window.location.hash;
    if (historyReplace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
  }
}

export default CatalogState;

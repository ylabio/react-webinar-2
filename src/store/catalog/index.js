import StateModule from "../module";
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
        category: ""
      },
      waiting: false,
      categories: []
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
    if (urlParams.category) validParams.category = urlParams.category || "";
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
    const response = await fetch(`/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(*),count&sort=${newParams.sort}&search[query]=${newParams.query}${newParams.category && "&search[category]=" + newParams.category}`);
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

  /**
 * Загрузка категорий
 * @param depth {Number}
 */
  async loadCategories(depth = 5) {
    const r = (depth) => {
      if (depth > 0) {
        return `name,title,parent(${r(depth - 1)})`
      } else {
        return "name,title"
      }
    };
    const categories = []
    const createCategories = (arr, i = 0, mark = "- ") => {
      arr.forEach((elem) => {
        if (elem.children) {
          categories.push({ title: `${mark.repeat(i)}${elem.title}`, value: elem._id })
          createCategories(elem.children, i + 1)
        } else {
          categories.push({ title: `${mark.repeat(i)}${elem.title}`, value: elem._id })
        }
      })
    };

    try {
      const response = await fetch(`api/v1/categories?fields=items(${r(depth)})`)
      const json = await response.json();
  
      const { items } = json.result;
  
      const result = Array.from(
        items.reduce((acc, o) => {
          let _id, name;
          if (o.parent) {
            [_id, name] = [o.parent._id, o.parent.name];
          }
  
          if (!acc.has(_id)) acc.set(_id, { _id, name }) // if the current item's parent doesn't exist, create it in the Map
  
          const parent = acc.get(_id) // get the current parent
  
          parent.children ??= [] // init children if it doesn't exist
  
          if (!acc.has(o._id)) acc.set(o._id, o) // add the current item to the Map if it doesn't exist
          else Object.assign(acc.get(o._id), o) // combine it with the existing object if it does
  
          parent.children.push(acc.get(o._id)) // add the item to the children
  
          return acc
        }, new Map()).values()
      ).filter(o => !o.hasOwnProperty('parent'))
  
      createCategories(result[0].children);  //TODO: result[0].children - самые высшие категории (электроника и книги)
  
      // Установка полученных данных
      this.setState({
        ...this.getState(),
        categories
      }, "загрузка категорий");
    } catch(e) {
      console.log("load categories err", e)
    }
  }
}

export default CatalogState;

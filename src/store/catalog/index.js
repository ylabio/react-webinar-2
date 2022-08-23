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
class CatalogState extends StateModule{

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
        sort: 'sort',
        query: '',
      },
      categories: [],
      waiting: false
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из query string адреса
   * @param params
   * @return {Promise<void>}
   */
  async initParams(params = {}){
    // Параметры из URl. Их нужно валидирвать, приводить типы и брать толкьо нужные
    const urlParams = qs.parse(window.location.search, QS_OPTIONS.parse) || {}

    let validParams = {};
    if (urlParams.page) validParams.page = Number(urlParams.page) || 1;
    if (urlParams.limit) validParams.limit = Number(urlParams.limit) || 10;
    if (urlParams.sort) validParams.sort = urlParams.sort;
    if (urlParams.query) validParams.query = urlParams.query;

    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = {...this.initState().params, ...validParams, ...params};
    // Установка параметров и подгрузка данных
    await this.setParams(newParams, true);
    await this.initCategories();
  }

  /**
   * Сброс параметров к начальным
   * @param params
   * @return {Promise<void>}
   */
  async resetParams(params = {}){
    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = {...this.initState().params, ...params};
    // Установк параметров и подгрузка данных
    await this.setParams(newParams);
  }

  /**
   * Устанвока параметров и загрузка списка товаров
   * @param params
   * @param historyReplace {Boolean} Заменить адрес (true) или сделаит новую запис в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(params={}, type, historyReplace = false){
    let newParams = {}
    if (type === 'category'){
      const category = this.getState().categories.filter(item => item.name === params.sort);
      if (category.length === 1) {
        const id = category[0]._id;
        let newString = this.getState().params.sort.indexOf('&search[category]=') === -1
      ? this.getState().params.sort + '&search[category]=' + id
      : this.getState().params.sort.substring(0, this.getState().params.sort.indexOf('&search[category]=')) + '&search[category]=' + id
      newParams = {...this.getState().params, sort : newString}
    } else {
      newParams = {...this.getState().params,...params}
    }
    } else if (type === 'sort'){
      this.getState().params.sort.indexOf('&search[category]=') === -1
      ? newParams = {...this.getState().params, ...params}
      : newParams = {...this.getState().params, sort : params.sort + this.getState().params.sort.substring(this.getState().params.sort.indexOf('&search[category]='))}
    } else {
      newParams = {...this.getState().params, ...params};
    }
    
    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params: newParams,
      waiting: true
    });

    const skip = (newParams.page - 1) * newParams.limit;
    const response = await fetch(`/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(*),count&sort=${newParams.sort}&search[query]=${newParams.query}`);
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

  async initCategories(){
    const response = await fetch('/api/v1/categories')
    const json = await response.json();

    this.setState({
      ...this.getState(),
      categories: json.result.items
    })

  }
}

export default CatalogState;

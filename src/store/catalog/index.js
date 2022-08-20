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
        sort: 'order',
        query: '',
        category: ''
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
    await this.getAllCategories();
    // await this.getItemsByCategoryId();
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
  async setParams(params = {}, historyReplace = false){
    const newParams = {...this.getState().params, ...params};

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

  async getAllCategories(){
    // Решение из интернета
    const res = await fetch('/api/v1/categories')
    const json = await res.json()
    const newArr = json.result.items.map(c => ({
      _id: c._id,
      title: c.title,
      parent: c.parent?._id
    }))
    for (let item of newArr) {
      if (!item.parent) continue

      let parentId = item.parent
      do {
        const temp = newArr.find(item => item._id === parentId)
        item.title = '-' + item.title
        parentId = temp.parent
      } while (parentId)
    }

    newArr.forEach((category, index) => {
      if (category.parent) {
        newArr.splice(newArr.findIndex(el => el._id === category.parent) + 1, 0, category)
        newArr.splice(index + 1, 1)
      }
    })

    this.setState({
      ...this.getState(),
      categories: newArr
    })
  }

  async getItemsByCategoryId(category){
    await this.setParams({category})
    const state = this.getState();
    const limit = this.getState().params.limit;
    const page = this.getState().params.page;
    const skip = (page - 1) * 10;
    console.log('skip', skip)
    const item = this.getState().categories.find(el => el.title === state.params.category);
    const result = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count&search[category]=${item?._id}`);
    const json = await result.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count
    })
    // console.log('json', json)
  }

}

export default CatalogState;

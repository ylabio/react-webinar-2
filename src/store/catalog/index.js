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
      categories: [{title: 'Все', value: ''}],
      count: 0,
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        category: '',
        query: ''
      },
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
    if (urlParams.category) validParams.category = urlParams.category;

    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = {...this.initState().params, ...validParams, ...params};
    // Установка параметров и подгрузка данных
    await this.setParams(newParams, true);
    await this.setCategories();
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
    const categoryParam = newParams.category ? `&search[category]=${newParams.category}` : ''
    const response = await fetch(`/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(*),count&sort=${newParams.sort}&search[query]=${newParams.query}${categoryParam}`);
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
  
  async setCategories(){
    if (this.getState().categories[1]) return;

    this.setState({
      ...this.getState(),
      waiting: true
    });

    const responseItems = await fetch(`/api/v1/articles?limit=1000`);
    const jsonItems = await responseItems.json();

    let filter = jsonItems.result.items.reduce((accumulator, currentValue) => {
      if (accumulator.every(item => !(item.category._id === currentValue.category._id))) accumulator.push(currentValue);
      return accumulator;
    }, []);
    
    const items = await Promise.all(
      filter.map(async (item) => {
        const response = await fetch(`/api/v1/categories/${item.category._id}`);
        const json = await response.json();
        return {
          title: json.result.title,
          value: json.result._id,
          parent: json.result.parent
        }
      }),
    );

    items.sort((a, b) => a.value > b.value ? 1 : -1);

    const newItems = []
    let startIndex = 0;
    items.forEach(((item, ind) => {
      if (item.parent) {
        for (let i = 0; i < newItems.length; i++) {
          if (newItems[i].value === item.parent._id) {
            let countRepeat;
            const regexp = newItems[i].title.match(/[-]/g);
            if(regexp) {
              startIndex = 1;
              countRepeat = 1 + regexp.length;
            } else {
              startIndex += 1;
              countRepeat = 1;
            }
            const copyItem = {...item, title: `${`- `.repeat(countRepeat)}${item.title}`};
            return newItems.splice(i + startIndex, 0, copyItem)
          }
        }
      }
      return newItems.splice(ind, 0, item);
    }))

    this.setState({
      ...this.getState(),
      categories: [...this.getState().categories, ...newItems],
      waiting: false
    });
  }
}

export default CatalogState;

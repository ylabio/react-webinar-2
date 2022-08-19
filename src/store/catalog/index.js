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
        category: '',
      },
      menu: [{_id: '', title: 'Все', value: ''}],
      waiting: false
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
    if (urlParams.category) validParams.category = urlParams.category;

    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = {...this.initState().params, ...validParams, ...params};
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
  async setParams(params = {}, historyReplace = false) {
    const newParams = {...this.getState().params, ...params};

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params: newParams,
      waiting: true
    });

    const skip = (newParams.page - 1) * newParams.limit;
    const category = newParams.category.length !== 0 ? `&search[category]=${newParams.category}` : ''
    const response = await fetch(`/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(*),count&sort=${newParams.sort}&search[query]=${newParams.query}${category}`);
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
   * Устанвока параметров и загрузка списка товаров

   * @returns {Promise<void>}
   */
  async setCategories() {
    const response = await fetch(`/api/v1/categories?lang=ru&limit=*&fields=title, parent,_id`);
    const json = await response.json();

    const menu = []
    json.result.items.map(({title, _id, parent}) => {
      if (parent === null) {
        menu.push({title, _id, children: [], prefixMenu: 0})
      }
      if (parent) {
        const index = menu.findIndex((item) => item._id === parent._id)
        menu[index].children.push(_id)
        menu.push({title, _id, children: [], prefixMenu: menu[index].prefixMenu + 1})
      }
    })

    const sortMenu = [{_id: '', title: 'Все', value: ''}]
    menu.map(({title, _id, children, prefixMenu}) => {
      const index = sortMenu.findIndex(item => item._id === _id)
      if (index === -1) {
        sortMenu.push({_id, title, prefixMenu, value: _id})
      }

      if (children.length !== 0) {
        const subMenu = []
        const indexParentMenu = sortMenu.findIndex(item => item._id === _id)

        children.map(child => {
          const index = menu.findIndex(({_id}) => _id === child)
          const prefixesName = '-'.repeat(menu[index].prefixMenu)
          const newTitle = `${prefixesName} ${menu[index].title}`
          subMenu.push({_id: child, title: newTitle, value: child})
        })

        sortMenu.splice(indexParentMenu + 1, 0, ...subMenu)
      }
    })

    // Установка полученных данных и сброс признака загрузки
    this.setState({
      ...this.getState(),
      menu: sortMenu,
      waiting: false,
    });
  }
}

export default CatalogState;

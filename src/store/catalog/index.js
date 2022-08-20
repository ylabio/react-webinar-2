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
      cats: [{value: '', title: 'Все'}],
      items: [],
      count: 0,
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        cat_id: ''
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
    // Параметры из URl. Их нужно валидирвать, приводить типы и брать только нужные
    const urlParams = qs.parse(window.location.search, QS_OPTIONS.parse) || {}
    let validParams = {};
    if (urlParams.page) validParams.page = Number(urlParams.page) || 1;
    if (urlParams.limit) validParams.limit = Number(urlParams.limit) || 10;
    if (urlParams.sort) validParams.sort = urlParams.sort;
    if (urlParams.query) validParams.query = urlParams.query;
    if (urlParams.cat_id) validParams.cat_id = urlParams.cat_id;

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
  async resetParams(params = {}){
    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = {...this.initState().params, ...params};
    // Установк параметров и подгрузка данных
    await this.setParams(newParams);
  }

  /**
   * Установка параметров и загрузка списка товаров
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

    let parent = [];
    let child = [];
    let catList = [];
    let diff = [];
    let resArticles;

    const skip = (newParams.page - 1) * newParams.limit;
    // Загрузка товаров из каталога
    if (newParams.cat_id === '') {
      resArticles = await fetch(`/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(*),count&sort=${newParams.sort}&search[query]=${newParams.query}`);
    } else {
      resArticles = await fetch(`/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(*),count&sort=${newParams.sort}&search[query]=${newParams.query}&search[category]=${newParams.cat_id}`);
    }
    const articles = await resArticles.json();
    // Загрузка категорий товаров из каталога
    const resCats = await fetch('api/v1/categories?lang=ru&fields=%2A');
    const cats = await resCats.json();

    // Определяем вложенность категорий для правильного отображения выпадающего списка
    cats.result.items.forEach(item => item.hasOwnProperty('parent')
      ? child.push({value: item._id, title: item.title, parentId: item.parent._id})
      : parent.push({value: item._id, title: item.title}));

    for (let i = 0; i < parent.length; i++) {
      catList.push(parent[i]);
      for (let j = 0; j < child.length; j++) {
        if (child[j].parentId === parent[i].value) {
          child[j].title = '- '.concat(child[j].title)
          catList.push(child[j])
        }
      }
    }

    // Второй уровень вложения
    diff = child.filter(({value: id1}) => !catList.some(({value: id2}) => id2 === id1));

    for (let i = 0; i < diff.length; i++) {
      let catListIdx = catList.findIndex((item) => item.value === diff[i].parentId)
      if (catListIdx >= 0 && i === 1) {
        catList.splice(catListIdx + 1, 0, {...diff[i], title: '--- '.concat(diff[i].title)})
      } else {
        catList.splice(catListIdx + 1, 0, {...diff[i], title: '-- '.concat(diff[i].title)})
      }
    }

    // Установка полученных данных и сброс признака загрузки
    this.setState({
      ...this.getState(),
      items: articles.result.items,
      count: articles.result.count,
      cats: [this.getState().cats[0], ...catList],
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

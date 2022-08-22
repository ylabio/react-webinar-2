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
        category: '',
        query: '',
      },
      categoryItems: [],
      waiting: false,
   
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
    const newParams = { ...this.initState().params, ...validParams, ...params };
    // Установка параметров и подгрузка данных
    await this.setParams(newParams, true);
  }
  recursion(item, arr, count) {
    let parentId, parent;
    
    if(item.parent && count < 3) {
      //count-количество ---,3 так как максимальное количество их 3 

      parentId = item.parent._id;
      parent = arr.find(el => parentId == el._id);
      return this.recursion(parent, arr, count + 1);
    }

    return count;
  }

  sortOfCategories(arr) {
    arr.forEach(item => {
      if(item.parent) {
        let count = this.recursion(item, arr, 0);
        let countI = 0;
        while (countI < count) {
          item.title = "-" + item.title;
          countI++;
        }

        let indexItem, indexParent;
        arr.forEach((itemTree, index) => {
          if (itemTree._id === item._id) {
            indexItem = index;
          }
          if (itemTree._id === item.parent._id) {
            indexParent = index;
          }
        });
        arr.splice(indexParent+1, 0, arr.splice(indexItem, 1)[0]);
      }
    })
    return(arr)
  }
  async getCategory() {
    const response = await fetch('/api/v1/categories')
    const json = await response.json()
    const category = json.result.items
    // const notParentCategory = []
    // for (const item of category) {
    //   if (item.parent) {
    //     notParentCategory.push(item)
    //   }

    // }


    // console.log(notParentCategory);
    // category.map((item) => {
    //   notParentCategory.forEach((notParent) => {

    //     if (item.parent?._id === notParent._id) {
    //       console.log(item)
    //     }



    //   })
    // })
    category.unshift({ _id: '', title: 'Все' })
    this.setState({
      ...this.getState(),
      categoryItems:this.sortOfCategories(category),

    });
  }
  //
  
  //
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
    const category = newParams.category ? `&search[category]=${newParams.category}` : ''

    const skip = (newParams.page - 1) * newParams.limit;
    const response = await fetch(`/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(*),count&sort=${newParams.sort}${category}&search[query]=${newParams.query}`);
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

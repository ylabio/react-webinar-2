import StateModule from "../module";
import qs from "qs";

const QS_OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: "comma",
    encode: false,
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true,
  },
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
      count: 0,
      categories: [{ value: "", title: "Все", nesting: "", id: 1 }],
      params: {
        page: 1,
        limit: 10,
        sort: "order",
        query: "",
        category: "",
      },
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
    const urlParams = qs.parse(window.location.search, QS_OPTIONS.parse) || {};
    let validParams = {};
    if (urlParams.page) validParams.page = Number(urlParams.page) || 1;
    if (urlParams.limit) validParams.limit = Number(urlParams.limit) || 10;
    if (urlParams.sort) validParams.sort = urlParams.sort;
    if (urlParams.query) validParams.query = urlParams.query;
    if (urlParams.category) validParams.category = urlParams.category;

    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...validParams, ...params };
    // Установка параметров и подгрузка данных
    await this.setCategories();
    await this.setParams(newParams, true);
  }

  // устанавливает категории товаров с соответствующей последовательностью в массиве
  async setCategories() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch("/api/v1/categories");
      const json = await response.json();
      // массив объектов с нужными полями для рендера опций в селекте
      let items = json.result.items.map((item, _, arr) => ({
        value: item._id,
        title: item.title,
        id: item._id,
        parent: item.parent ? item.parent._id : "",
        // доп поле куда записывается вложенность элемента
        nesting: (() => {
          let parent = item.parent ? item.parent._id : "";
          let nesting = "";
          if (parent) {
            // если есть родитель проверить у родителя наличие своего родителя
            // и прибавить вложенность
            while (parent) {
              // так как есть родитель прибавить вложенность
              nesting += "- ";
              // найти индекс элемента из массива по айди родителя
              const index = arr.findIndex((item) => item._id === parent);
              // по найденному индексу посмотреть есть ли у него родитель
              parent = arr[index].parent ? arr[index].parent._id : "";
            }
          }
          return nesting;
        })(),
      }));

      this.setState({
        ...this.getState(),
        waiting: false,
      });

      // найти максимальную вложенность
      const maxNesting = items.reduce(
        (maxNesting, item) => (item.nesting.length > maxNesting ? item.nesting.length : maxNesting),
        0
      );

      // массив по длине максимальной вложенности
      const categories = Array.from({ length: maxNesting }).reduce(
        (categories) => {
          items.forEach((item, i) => {
            const parent = item.parent;
            if (parent) {
              // найти крайний в последовательности индекс элемента с таким же родителем если он есть
              // если такой индекс есть то он вставит item следом за этим индексом
              let index = categories.reduce(
                (index, item, idx) => (item.parent === parent && idx > index ? idx : index),
                -1
              );
              // если нет элемента с таким же родителем
              // то найти индекс исходного родителя по его айди
              // чтобы вставить объект следом за родителем в массиве
              if (index === -1) {
                index = categories.findIndex((item) => item.id === parent);
              }
              // по найденному индексу вставить после него следующий элемент
              categories = [
                ...categories.slice(0, index + 1),
                { ...item, title: item.nesting + item.title },
                ...categories.slice(index + 1),
              ];
              // удалить элемент так как он уже добавлен
              // или можно указать в условие с parent && item.nesting === '- '.repeat(index + 1)
              // для того чтобы элементы повторно не добавлялись
              items = items.filter((deletedItem) => item.id === deletedItem.id);
              // или delete items[i];
            }
          });
          return categories;
        },
        items.filter((item) => item.parent === "") // изначальный массив с самыми верхними родителями категорий товаров
      );

      this.setState({
        ...this.getState(),
        categories: [{ value: "", title: "Все", nesting: "", id: 1 }, ...categories],
      });
    } catch (err) {
      console.log(err);
      this.setState({
        ...this.getState(),
        waiting: false,
      });
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
      waiting: true,
    });

    const skip = (newParams.page - 1) * newParams.limit;
    const response = await fetch(
      `/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(*),count&sort=${
        newParams.sort
      }&search[query]=${newParams.query}${newParams.category && `&search[category]=${newParams.category}`}`
    );
    const json = await response.json();

    // Установка полученных данных и сброс признака загрузки
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
      waiting: false,
    });

    // Запоминаем параметры в URL
    let queryString = qs.stringify(newParams, QS_OPTIONS.stringify);
    const url = window.location.pathname + queryString + window.location.hash;
    if (historyReplace) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }
  }
}

export default CatalogState;

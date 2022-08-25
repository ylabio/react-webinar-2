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
class CategoryState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: ''
      },
      categories:[],
    };
  }

  async resetParams(params = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...params };
    // Установк параметров и подгрузка данных
    await this.store.get('catalog').setParams(newParams)
  }
  async categories() {
    const response = await fetch(`/api/v1/categories?fields=items(*),parent&limit=*`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      categories: json.result.items
    })
  }
}
export default CategoryState;
 
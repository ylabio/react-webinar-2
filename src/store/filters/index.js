import StateModule from '../module';
import qs from 'qs';

const QS_OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: 'comma',
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
class FiltersState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      allCategories: [],
    };
  }

  async initParams(params = {}) {
    await this.loadAllCategories();
  }

  async loadAllCategories() {
    const response = await fetch(`/api/v1/categories?fields=items(*),parent&limit=*`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      allCategories: json.result.items,
    });
  }
}

export default FiltersState;

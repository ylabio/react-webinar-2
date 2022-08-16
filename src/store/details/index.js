import StateModule from '../module';
import axios from 'axios';

/**
 * Состояние каталога
 */
class DetailsState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      details: {},
    };
  }

  async loadDetails(id) {
    const response = await axios.get(
      `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
    );
    const json = await response.data.result;
    this.setState({
      details: json,
    });
  }
}

export default DetailsState;

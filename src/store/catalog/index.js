import StateModule from "../module";
import YLabService from "../../services/ylab-service";

const service = new YLabService();

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
      total: null
    };
  }

  async load(skip = 0, limit = 0){
    const response = await service.getArticles(skip, limit);
    this.setState({
      items: response.items,
      total: response.total,
    }, 'Загрузка каталога');
  }
}

export default CatalogState;

import StateModule from "../module";

/**
 * Состояние каталога
 */
class CategoryState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categoryList: [],
    };
  }

  async load(){
    const response = await fetch( `/api/v1/categories`)
    const json = await response.json();

    this.setState({
      ...this.getState(),
      categoryList: json.result.items,
    });
  }
}

export default CategoryState;

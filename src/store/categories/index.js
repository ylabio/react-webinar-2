import StateModule from '../module'

/**
 * Состояние категорий
 */
class CatalogCategories extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      params: {
        limit: 11,
      },
      waiting: false,
    }
  }

  /**
   * Получение категорий
   * @return {Promise<void>}
   */
  async getCategories(limit = 11) {
    const response = await fetch(`/api/v1/categories?limit=${limit}`)
    const json = await response.json()

    this.setState({
      ...this.getState(),
      categories: json.result.items,
    })
  }
}

export default CatalogCategories

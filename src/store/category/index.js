import StateModule from "../module";

class CategoryState extends StateModule {
  initState() {
    return {
      array: [],
      waiting: false,
    };
  }

  async setCategory() {
    try {
      this.setState({
        ...this.getState(),
        waiting: true,
      });
      const response = await fetch(
        `api/v1/categories?lang=ru&limit=100&skip=0&fields=%2A`
      );
      const json = await response.json();

      if (json.error) {
        this.setState({
          ...this.getState(),
          waiting: false,
        });
      } else {
        // Установка полученных данных и сброс признака загрузки
        this.setState({
          array: json.result.items,
          waiting: false,
        });
      }
    } catch (e) {}
  }
}

export default CategoryState;

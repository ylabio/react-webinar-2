import StateModule from "../module";

/**
 * Состояние товара
 */
class Category extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return [{ value: "", title: "Все" }];
  }

  async load() {
    const categoriesState = this.getState();

    if (categoriesState.length > 1) {
      return;
    }

    const response = await fetch(
      "api/v1/categories?lang=ru&skip=0&fields=name%2C%20title%2C%20parent"
    );
    const json = await response.json();

    const category = [];

    json.result.items.forEach((item) => {
      category.push({
        value: item._id,
        title: item.title,
      });
    });

    console.log(category);

    this.setState([...categoriesState, ...category]);
  }
}

export default Category;

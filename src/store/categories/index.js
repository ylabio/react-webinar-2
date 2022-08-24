import StateModule from "../module";

/**
 * Состояние категорий товара
 */
class CategoriesState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [{ value: "", title: "Все", nesting: "", id: 1 }],
    };
  }

  // устанавливает категории товаров с соответствующей последовательностью в массиве
  async loadCategories() {
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
        items: [{ value: "", title: "Все", nesting: "", id: 1 }, ...categories],
      });
    } catch (err) {
      console.log(err);
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }
}

export default CategoriesState;

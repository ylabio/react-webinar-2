import StateModule from '../module';

class Categories extends StateModule {
  initState() {
    return {
      categories: [],
    };
  }

  async categoriesLoad() {
    const res = await fetch('/api/v1/categories');
    const data = await res.json();
    const categories = data.result.items.map((item) => ({
      title: item.title,
      parent: item.parent?._id,
      id: item._id,
    }));

    for (let value of categories) {
      let minus = value.parent;
      do {
        if (!minus) continue;
        const fnd = categories.find((elem) => elem.id === minus);
        value.title = '-' + value.title;
        minus = fnd.parent;
      } while (minus);
    }
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].parent) {
        let index = categories.findIndex((item) => item.id === categories[i].parent);
        categories.splice(index + 1, 0, categories[i]);
        categories.splice(i + 1, 1);
      }
    }

    this.setState({
      ...this.getState(),
      categories,
    });
  }
}

export default Categories;

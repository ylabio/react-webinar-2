import addCategoriesNesting from "./addCategoriesNesting";
import getFetchState from "../utils/getFetchState";
import StateModule from "../module";

class FilterOptionsState extends StateModule {
  initState() {
    return {
      categories: [
        { value: '', title: 'Все' },
      ],
      fetchState: {
        pending: true,
        error: false,
        ok: false,
      },
    };
  }

  async fetchCategories() {
    if (this.getState().categories.length > 1) return;

    await fetch('/api/v1/categories?limit=20')
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error(res.status + ' ' + res.statusText);
      })
      .then(json => {
        json = json.result.items.map(item => {
          return { ...item, value: item._id }
        });
        this.setState({
          categories: this.initState().categories.concat(addCategoriesNesting(json)),
          fetchState: getFetchState('ok'),
        }, 'Загружены категории фильтра')
      })
      .catch(err => {
        console.error('store.filterOptions.fetchCategories() ' + err);
        this.setState({
          categories: this.initState().categories,
          fetchState: getFetchState('error'),
        }, 'Ошибка при загрузке категорий фильтра')
      });
  }
};

export default FilterOptionsState;
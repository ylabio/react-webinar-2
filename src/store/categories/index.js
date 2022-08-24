import StateModule from "../module";

/**
 * Состояние категорий
 */
class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [{value:'', title: 'Все'}]
    };
  }

  /**
   * Получение списка категорий.
   */
  async load() {
    const response = await(
      await fetch(`/api/v1/categories?limit=*`)
    ).json();
    const objects = response.result.items;
    const list = [{value:'', title: 'Все'}];
    const childs = new Map();
    const roots = [];
    const recurse = (obj, level = 0) => {
      list.push({ value: obj._id, title: '- '.repeat(level) + ' ' + obj.title });
      const ch = childs.get(obj._id);
      if (!ch) return;
      level++;
      ch.forEach(obj => recurse(obj, level));
    };

    objects.forEach(obj => {
      const p = obj.parent;
      if (p) {
        if (!childs.has(p._id))
          childs.set(p._id, [obj]);
        else
          childs.get(p._id).push(obj);
      } else
        roots.push(obj);
    });
  
    roots.forEach(obj => recurse(obj));
    
    this.setState({
      ...this.getState(),
      list
    }, 'Categories laded');
  }

  // пока не надо это
  /* #resetCategories() {
    this.setState({
      ...this.getState(),
      list: [
        {value:'all', title: 'Все'}
      ]
    }, 'Reset categories');
  } */
}

export default CategoriesState;
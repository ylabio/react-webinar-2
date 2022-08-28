import StateModule from "../module";

/**
 * Состояние каталога
 */
class CatalogCategory extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      categoryList:[]
    };
  }
  InitCatory(obj){     
      const makeChildTree = (arr) => {
        arr.map((item) => {
          if (!item.parent) {
            item.parent = {_id: null};
          }
        });
        const addChildren = (items, _id = null) => items
          .filter(item => item.parent._id === _id)
          .map(item => ({...item, children: addChildren(items, item._id)}));
        return addChildren(obj);
      }
      const makeList = (tree) => {
        const categories = [];
        const step = (item, level = '') => {
          categories.push({_id: item._id, title: `${level} ${item.title}`});
          item.children.forEach((child) => step(child, `- ${level}`));
        }
        tree.forEach(i => step(i));
        return categories;
      };
      const categoriesTree = makeChildTree(obj);
      const categoriList=makeList(categoriesTree)
      categoriList.unshift({_id:'',title: 'Все'})
      return categoriList
    }
  /**
   * Загрузка категорий товаров
   * @param params
   * @param historyReplace {Boolean} Заменить адрес (true) или сделаит новую запис в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setCategoryList(){
    this.setState({
      ...this.getState(),
      waiting: true
    });
    const responseCategori = await fetch(`api/v1/categories?limit=*&fields=items(title,parent(title))`)
    const obj = await responseCategori.json();
    const categoriList= this.InitCatory(obj.result.items)

    // Установка полученных данных и сброс признака загрузки
    this.setState({
      ...this.getState(),
      categoryList:categoriList,
      waiting: false
    });
  }
}
export default CatalogCategory;

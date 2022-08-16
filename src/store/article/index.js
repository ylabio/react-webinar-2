import StateModule from "../module";

/**
 * Выбор товара для показа информации
 */
class ArticleState extends StateModule{

  initState() {
    return {
      goods: {},
      country: '',
      category: ''
    };
  }

  /**
   * Отображение информации в зависимотси от id
   * @param id {String} id товара
   */
  setId(id){
    const goods = this.store.getState().catalog.items.find(item => item._id === id);
    const country = '';
    const category = '';
    this.setState({
        goods,
        country,
        category
    }, `Описание товара с id: ${goods._id}`);
  }

  async load(number){
    const responseGoods = await fetch(`/api/v1/articles/${number}?fields=*,maidIn(title,code),category(title,_id)`);
    const goods = await responseGoods.json();
    this.setState({
        goods: goods.result,
        country: goods.result.maidIn.title,
        category: goods.result.category.title
    });
  }
}

export default ArticleState;
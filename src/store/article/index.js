import StateModule from "../module";

/**
 * Выбор товара для показа информации
 */
class ArticleState extends StateModule{

  initState() {
    return {
      goods: [],
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

  async load(){
    const responseCountry = await fetch(`/api/v1/countries/${this.store.getState().article.goods.maidIn._id}`);
    const responseCategory = await fetch(`/api/v1//categories/${this.store.getState().article.goods.category._id}`);
    const country = await responseCountry.json();
    const category = await responseCategory.json();
    this.setState({
        goods: this.store.getState().article.goods,
        country: country.result.title,
        category: category.result.title
    });
  }
}

export default ArticleState;
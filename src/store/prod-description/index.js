import StateModule from "../module";

class Product extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  
  initState() {
    return {
      item:{},
      name: null,
      description: null,
      madeIn: null,
      madeInCode: null,
      category: null,
      edition: null,
      price: 0,
      loaded:true
    };
  }  
  /**
   * Загрузка товара
   */
   async loadItem(id){
    this.setState({...this.getState(),loaded:false})
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      item:{...json.result},
      name: json.result.title,
      description:json.result.description,
      madeIn: json.result.maidIn.title,
      madeInCode: json.result.maidIn.code,
      category: json.result.category.title,
      edition: json.result.edition,
      price: json.result.price,
      loaded:true
    },'Загрузка описания товара');
   }

  }

export default Product;

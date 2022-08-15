import StateModule from "../module";

// состояние корзины
class ProductPageState extends StateModule{

  //начальное состояние
  initState() {
    return {
        _id: '',
       item: {}
    };
  }

  async loadItem(_id){
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      _id,
      item: json.result,
    });
  }

  
  getId(_id) {
    this.setState({
      _id,
      item: {}
    })
  }


  //очищение состояния
   toNull() {
    this.setState({
      _id: '',
      item: {}
    })
   }

}

export default ProductPageState;
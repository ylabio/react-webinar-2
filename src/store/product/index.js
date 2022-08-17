import StateModule from "../module";

class ProductState extends StateModule {

  initState(){

    return {
      _id: null,
      title: null,
      description: null,
      maidIn: {
        country: null,
        code: null
      },
      edition: null,
      price: null,
      category: null
    };
  }

  async load(id){
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json(); 

    this.setState({
      _id: json.result._id,
      title: json.result.title,
      description: json.result.description,
      maidIn: {
        country: json.result.maidIn.title,
        code: json.result.maidIn.code
      },
      edition: json.result.edition,
      price: json.result.price,
      category: json.result.category.title
    });
  }
}

export default ProductState;
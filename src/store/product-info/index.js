import StateModule from '../module';


class ProductInfo extends StateModule {


  initState() {
    return {
      oneProduct: {
        _id: '',
        title: '',
        description: '',
        price: 0,
        maidIn: '',
        category: '',
        edition: 0
      }
    };
  }


   async getActicle(id){
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      oneProduct: {
        _id: json.result._id,
        title: json.result.title,
        description: json.result.description,
        maidIn: `${json.result.maidIn.title} (${json.result.maidIn.code})`,
        category: json.result.category.title,
        price: json.result.price,
        edition: json.result.edition
      }
    });
  }
}

export default ProductInfo;
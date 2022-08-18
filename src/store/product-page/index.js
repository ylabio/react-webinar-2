import StateModule from "../module";

class ProductPage extends StateModule {
    initState(){
        return {
            currenProduct : null,
            currentId: ''
        }
    }

    async getProduct(id){
        const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`)
        const json = await response.json();
        this.setState({
            currenProduct: json.result,
            currentId: id
          });
    }
}

export default ProductPage
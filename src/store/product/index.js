import StateModule from "../module";
class CurrentProduct extends StateModule{

  initState() {
    return {
      item: null
    };
  }

  async load(_id){
    this.setState({
      item: null
    })
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    // console.log(json.result)
    this.setState({
      item: json.result,
      loading: false
    }, "Конкретный товар")
  }

  clear(){
    this.setState({
      item: null
    })
  }

}
  
export default CurrentProduct;
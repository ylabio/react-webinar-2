import StateModule from "../module";

class CategoriesState extends StateModule {
  initState() {
    return {
      list: [{ _id: "", name: "", title: "", parent: { _id: "" } }],
    };
  }

  async getList() {
    const API_url =
      "/api/v1/categories?fields=items(_id,name,title,parent(_id))&limit=*";
    const cat_response = await fetch(API_url);
    const cat_json = await cat_response.json();

    this.setState({ list: cat_json.result.items });
  }
}

export default CategoriesState;

import StateModule from "../module";

class Select extends StateModule{

    async initState(){
        this.setState({categories : []})
   
        const response = await fetch('/api/v1/categories?limit=*')
        const json = await response.json();
    
        this.setState({
          ...this.getState(),
          categories: json.result.items
        })
    
      }
}

export default Select
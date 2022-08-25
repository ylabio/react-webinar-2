import StateModule from "../module";

class CategorySate extends StateModule{

  // Начальное состояние
  initState() {
    return {
      categories:[],
    }
  }

  /**
   * Получаем с сервера список категорий
   */
  async getCategories() {
    const response =  await fetch('/api/v1/categories?limit=*&fields=_id,title,parent');    
    // const response =  await fetch('/api/v1/categories?limit=*');    
    const {result} = await response.json();
    this.setState({
      categories: result.items,
    }      
    )
  }

}

export default CategorySate;

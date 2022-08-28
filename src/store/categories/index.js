import StateModule from "../module";
import api from "../../api";

/**
 * Состояние категорий
 */
class CategoriesState extends StateModule {
  
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [{title: `Все`, _id: ''}],
    }
  }
  
  async getCategories() {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    
    const json = await this.services.api.request({url: '/api/v1/categories?fields=_id,title,parent&limit=*'});

    // const categories = [];
    // const sortCategories = (newItems, items, parentId = null, dashCount = 0) => {
    //   items.forEach(item => {
    //     if (item.parent === parentId || item.parent?._id === parentId) {
    //       const newItem = {...item};
    //       if (dashCount) {
    //         newItem.title = "- ".repeat(dashCount) + newItem.title;
    //       }
    //       newItems.push(newItem);
    //       sortCategories(newItems, items, newItem._id, dashCount + 1);
    //     }
    //   })
    // };
    //
    // sortCategories(categories, json.result.items);
    //
    this.setState({
      ...this.getState(),
      categories: json.result.items,
      waiting: false,
    });
  }
}

export default CategoriesState;

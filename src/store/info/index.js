import StateModule from "../module";
import {addLabels, makeTree} from '../../utils/make-categories'


/**
 * Состояние каталога
 */
class InfoState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    };
  }
  
  async getCategories(){
    fetch(`api/v1/categories`)
    .then(response => response.json())
    .then(result => {
      const arr = result.result.items.map(item => item.parent 
        ? {id: item._id, parentId: item.parent._id, value: item.name, title: item.title} 
        : {id: item._id, value: item.name, title: item.title}
      );
      
      const categories = addLabels(makeTree(arr));
      categories.unshift({value:'', title: 'Все'});

      this.setState({
        ...this.getState(),
        categories: categories,
      });
    });
  }
}

export default InfoState;

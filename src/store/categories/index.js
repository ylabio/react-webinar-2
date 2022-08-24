import StateModule from "../module";

class CategoriesState extends StateModule{
    /**
   * Начальное состояние
   * @return {Object}
   */

    initState() {
        return {
        categories: [],
        };
    }

    async loadCategories() {
        const response = await fetch(`api/v1/categories?limit=*`);
        const json = await response.json();
        
        const createTree = (array) => {
            let tree = []
                for (let i = 0; i < array.length; i++) {
                    array[i].children = []
                    if (array[i].parent) {
                        let parent = array.filter(elem => elem._id === array[i].parent._id).pop()
                        parent.children.push(array[i])
                    } else {
                        tree.push(array[i])
                    }
                }
            return tree
        };

        const res = [];
        function formateTree(arr, prefix = '') {
            arr.forEach( item => {
                res.push({value: item._id, title: prefix + item.title})
                if (item.children) {
                    formateTree(item.children,  prefix + "- ") 
                }  
            })
            return res;
        }
    
        const allCategories = [{value: '', title: 'Все'}, ...formateTree(createTree(json.result.items))]
        this.setState({
          ...this.getState(),
          categories: allCategories
        })
      }
}

export default CategoriesState;
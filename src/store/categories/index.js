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
        const createTreeData = (arr) => {
          const tree = Object.fromEntries(arr.map(item => [ item._id, { ...item, parent_id: item.parent?._id, children: [] } ]));
          return Object.values(tree).filter(item => !tree[item.parent_id]?.children.push(item));
        };

    
        function formateTree(arr, prefix = '') {
            let res = [];
            //     arr.forEach(obj => {
            //         obj.value = obj._id
            //         obj.title = prefix + obj.title
            //         if (obj.children) {
            //             formateTree(obj.children, prefix + '- ')
            //         }
            //         res.push(obj)
            //     })

            arr.forEach((item) => {
              res = [
                ...res,
                { value: item._id, title: prefix + item.title },
                ...(item.children
                ? formateTree(item.children, prefix + "- ")
                : {}),
              ];
            });
            return res;
        }
        
    
        const allCategories = [{value: '', title: 'Все'}, ...formateTree(createTreeData(json.result.items))]
        this.setState({
          ...this.getState(),
          categories: allCategories
        })
      }
}

export default CategoriesState;
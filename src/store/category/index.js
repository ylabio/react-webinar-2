import StateModule from "../module"

class Category extends StateModule {
    initState() {
        return {
            categoryItems: [],
        };
    }
    recursion(item, arr, count) {
        let parentId, parent;

        if (item.parent && count < 3) {
            //count-количество ---,3 так как максимальное количество их 3 

            parentId = item.parent._id;
            parent = arr.find(el => parentId == el._id);
            return this.recursion(parent, arr, count + 1);
        }

        return count;
    }
    sortOfCategories(arr) {
        arr.forEach(item => {
            if (item.parent) {
                let count = this.recursion(item, arr, 0);
                let countI = 0;
                while (countI < count) {
                    item.title = " - " + item.title;
                    countI++;
                }

                let indexItem, indexParent;
                arr.forEach((itemTree, index) => {
                    if (itemTree._id === item._id) {
                        indexItem = index;
                    }
                    if (itemTree._id === item.parent._id) {
                        indexParent = index;
                    }
                });
                arr.splice(indexParent + 1, 0, arr.splice(indexItem, 1)[0]);
            }
        })
        return (arr)
    }
    async getCategory() {
        const response = await fetch('/api/v1/categories?limit=*')
        const json = await response.json()
        const category = json.result.items

        category.unshift({ _id: '', title: 'Все' })
        this.setState({
            ...this.getState(),
            categoryItems: this.sortOfCategories(category),

        });
    }
}
export default Category
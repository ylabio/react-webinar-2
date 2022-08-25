import StateModule from "../module";
import sortingCategory from "../../utils/sortingCategory";

class Category extends StateModule {
    initState() {
        return {
            items: []
        };
    }

    async getCategory() {
        const responseCategory = await fetch(`api/v1/categories?limit=20`);
        const jsonCategory = await responseCategory.json();
        const sortCategory = sortingCategory(jsonCategory.result.items);


        this.setState({
            ...this.getState,
            items: sortCategory
        })

    }


}


export default Category;
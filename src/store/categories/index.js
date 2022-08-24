import StateModule from "../module";
import {categoryTree} from "../../utils/category-tree";

/**
 * Состояние категорий товара
 */
class CategoriesState extends StateModule{

    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            categories: []
        };
    }

    /**
     * Загрузка из api списка категорий товаров
     */
    async getCategories(){
        const response = await fetch('/api/v1/categories?limit=*');
        const json = await response.json();
        const categories = json.result.items

        this.setState({
            // Если в стейте одно свойство (categories) наверное можно this.getState удалить или закомментировать
            ...this.getState(),
            categories: categoryTree(categories)
        }, 'Загрузка категорий товавор в стейт')
        console.log(this.getState(categories))
    }
}

export default CategoriesState;
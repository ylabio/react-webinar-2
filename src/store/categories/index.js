import StateModule from "../module";
import categoriesToLabel from "../../utils/category-formatting";

/**
 * Состояние категорий
 */
class CategoriesState extends StateModule{

    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            items: [],
            waiting: false
        };
    }

    // Инициализация категорий
    async initCategories() {
        this.setState({
            ...this.getState(),
            items: [],
            waiting: true,
        });
        // Загрузка категорий
        const response = await fetch(`/api/v1/categories?limit=*`);

        const json = await response.json();
        console.log(json)
        // Преобразование в массив с префиксами дочерних элементов
        const items = [{value: '', title: 'Все'}, ...categoriesToLabel(json.result.items)]
        this.setState({
            ...this.getState(),
            items,
            waiting: false,
        });
    }
}

export default CategoriesState;
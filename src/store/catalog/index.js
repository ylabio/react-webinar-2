import StateModule from "../module";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule {

    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            items: [],
            count: 0,
            limit: 0,
            skip: 0
        };
    }

    async load() {
        const limit = 120;
        const skip = 29;
        const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
        const json = await response.json();
        this.setState({
            items: json.result.items,
            count: json.result.count,
            limit: limit,
            skip: skip
        });
    }

    /**
     * Создание записи
     */
    createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
        this.setState({
            items: this.getState().items.concat({_id, title, price, selected})
        }, 'Создание товара');
    }

    /**
     * Удаление записи по её коду
     * @param _id
     */
    deleteItem(_id) {
        this.setState({
            items: this.getState().items.filter(item => item._id !== _id)
        }, 'Удаление товара');
    }
}

export default CatalogState;

import counter from "../../utils/counter";
import StateModule from "../module";
import {getCountList, getItemList} from "../../api/api";

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
            amount: 0
        };
    }

    async loadInit() {
        const json = await getCountList();
        this.setState({
            items: json.items,
            amount: json.count
        })
    }

    async load(limit, skip) {
        const obj = await getItemList(limit, skip);
        this.setState({
            amount: this.getState().amount,
            items: obj.items
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

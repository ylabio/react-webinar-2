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
            amount: 0,
            limit: 0,
            currentPage: 1,
            skip: 0,
            isLoading: true,
            title: ''
        };
    }

    async loadInit() {
        const json = await getCountList();
        this.setState({
            ...this.getState(),
            items: json.items,
            amount: json.count
        })
    }

    async load() {
        console.log(this.getState().limit, this.getState().skip);
        const obj = await getItemList(this.getState().limit, this.getState().skip);
        this.setState({
            ...this.getState(),
            amount: this.getState().amount,
            items: obj.items
        });
    }

    setIsLoading(loading) {
        this.setState({
            ...this.getState(),
            isLoading: loading
        })
    }

    setLimit(limit) {
        this.setState({
            ...this.getState(),
            limit: limit,
        });
    }

    setCurrentPage(currentPage) {
        this.setState({
            ...this.getState(),
            currentPage: currentPage,
        });
    }

    setTitle(title) {
        this.setState({
            ...this.getState(),
            title: title,
        });
    }

    setSkip(skip) {
        this.setState({
            ...this.getState(),
            skip: skip,
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

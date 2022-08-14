import StateModule from "../module";

/**
 * Состояние корзины
 */
class ArticleState extends StateModule {


    initState() {
        return {
            _id: '',
            item: {}
        };
    }

    toReset() {
        this.setState({
            _id: '',
            item: {}
        })
    }

    async loadItem(_id) {
        const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
        const json = await response.json();
        this.setState({
            _id,
            item: json.result,
        });
    }

    /**
     * получение id продукта
     * @param _id Код товара
     */
    getId(_id) {
        this.setState({
            _id,
            item: {}
        })
    }

}

export default ArticleState;
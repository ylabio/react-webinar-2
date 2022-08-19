import StateModule from "../module";
import Api from "../../services/API";

const service = new Api();

/**
 * Состояние товара на странице
 */
class ArticleState extends StateModule {

    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            item: {
                id: '',
                title: '',
                description: '',
                country: '',
                countryCode: '',
                category: '',
                editionYear: '',
                price: '',
            }
        };
    }

    async load(id) {
        const response = await service.getArticle(id);
        this.setState({
            item: {
                ...response
            }
        });
    }

    clearData() {
        this.setState({
            item: {
                id: '',
                title: '',
                description: '',
                country: '',
                countryCode: '',
                category: '',
                editionYear: '',
                price: '',
            }
        });
    }
}

export default ArticleState;
import StateModule from "../module";

/**
 * Состояние продукта
 */
class DetailsState extends StateModule {

    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            item: null,
            isLoading: true
        };
    }

    async countryLoad(id) {
        const response = await fetch(`/api/v1/countries/${id}`)
        return await response.json();
    }

    async categoryLoad(id) {
        const response = await fetch(`/api/v1/categories/${id}`)
        return await response.json();
    }

    async load(id) {
        this.setLoading(true)
        const response = await fetch(`/api/v1/articles/${id}`);
        const json = await response.json();
        const country = await this.countryLoad(json.result.maidIn._id)
        const category = await this.categoryLoad(json.result.category._id)
        this.setState({
            ...this.getState(),
            item: {
                ...json.result,
                category: category.result.title,
                country: country.result.title,
                countryCode: country.result.code
            },
            isLoading: false
        });
    }

    setLoading(isLoading) {
        this.setState({
            ...this.getState(),
            isLoading: isLoading
        })
    }

}

export default DetailsState;
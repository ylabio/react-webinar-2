import StateModule from "../module";

class ItemState extends StateModule{

    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            item: null
        };
    }

    async load(id){
        const response = await fetch(`/api/v1/articles/${id}?fields=category,description,edition,maidIn,price,title`);
        const   {result}  = await response.json()

        const country = await fetch(`/api/v1/countries/${result.maidIn._id}`);
        const res = await country.json()

        const category = await fetch(`/api/v1/categories/${result.category._id}`);
        const cat = await category.json()

        this.setState({
            item: {
                title: result.title,
                description: result.description,
                edition: result.edition,
                price: result.price,
                country: res.result.title,
                countryCode: res.result.code,
                category: cat.result.title
            }
        });
    }

    unmount() {
        this.setState({
            item: null
        })
    }

}

export default ItemState;

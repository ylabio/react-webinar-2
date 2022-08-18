import StateModule from "../module";

/**
 * Управление товаром
 */
class ProductState extends StateModule{

    initState() {
        return {
            name: null,
            desc: null,
            maidIn: null,
            category: null,
            date: null,
            price: null,
        };
    }

    async load(id){
        const response = await fetch('/api/v1/articles/'+id+'/?fields=*,maidIn(title,code),category(title)');
        const json = await response.json();

        this.setState({
            name: json.result.title,
            desc: json.result.description,
            maidIn: json.result.maidIn.title + " ("+json.result.maidIn.code+")",
            category: json.result.category.title,
            date: json.result.dateCreate.split("-")[0],
            price: json.result.price,
        })

    }
}

export default ProductState;
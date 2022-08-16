import StateModule from "../module";


class ItemPageState extends StateModule{


    initState() {
        return {
            _id: '',
            item: {}
        };
    }

    async loadItem(_id){
        const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
        const json = await response.json();
        this.setState({
            _id: _id,
            item: json.result,
        });
    }

}

export default ItemPageState;
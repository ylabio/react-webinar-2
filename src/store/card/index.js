import StateModule from "../module";

/**
 * Состояние каталога
 */
class CardState extends StateModule{

    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            itemById: {

                category:{
                    _id:"",
                    _type:"",
                },
                maidIn:{
                    title:"",
                    code:"",
                },
            }
        }}

    async loadItem(_id){
        const response = await fetch(`api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
        const json = await response.json();
        this.setState({
            _id,
            itemById: json.result
        });
    }
}

export default CardState;

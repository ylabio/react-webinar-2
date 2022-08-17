import StateModule from "../module";

class DetailState extends StateModule{

    initState() {
        return {
            item: {},
        };
    }

    async getItem(_id){
        try{
            const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`)
            const json = await response.json()
            this.setState(json.result)
        } catch (error) {
            console.error(error)
        }
    }
}

export default DetailState;
import StoreModule from '../module'

class ArticleStore extends StoreModule {

    initState() {
        return {
            data: {},

        }
    }

    async load(id){
        try {
            const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`)
            const json = await response.json();
            if (json.error) throw new Error(json.error);

            this.setState({
                ...this.getState(),
                data: json.result,
            })
            } catch (e) {
                console.log(e.json())
            }

        }


}
export default ArticleStore
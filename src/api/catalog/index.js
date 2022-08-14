import axios from "axios";


export default class CatalogApi {

    static async getTotalCount() {
        const response = await axios.get('/api/v1/articles?limit=10&skip=10&fields=items(*),count',)
        return response.data.result.count
    }

    static async getArticles(limit=10, skip= 0) {
        const response = await axios.get(`/api/v1/articles?limit=${limit}&skip=${skip}`)
        return response.data.result.items
    }

}
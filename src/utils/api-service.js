export default class ApiService {
  static async getAll(limit = 10, skip = 0) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();      
    return json;
  }
  
  static async getOne(_id) {
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    return json;
  }
}
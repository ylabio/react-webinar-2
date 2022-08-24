import axios from "axios";

export default class Api {
  static async getAll(newParams, skip) {
    if (newParams.category) {
      const response = await fetch(
        `/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(*),count&sort=${newParams.sort}&search[query]=${newParams.query}&search[category]=${newParams.category}`
      );
      const json = await response.json();
      return json.result;
    } else {
      const response = await fetch(
        `/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(*),count&sort=${newParams.sort}&search[query]=${newParams.query}`
      );
      const json = await response.json();
      return json.result;
    }
  }

  static async getCategories() {
    const response = await axios.get("/api/v1/categories?limit=*");
    return response.data.result.items;
  }

  static async auth(login, password) {
    const json = {
      "login": login,
      "password": password,
    };
    const response = await axios.post("/api/v1/users/sign", json);
    return response.data.result;
  }

  static async authCheck(token) {
    const headers = {
      "Content-Type": "application/json",
      "X-Token": token,
    };

    const response = await axios.get("/api/v1/users/self", {
      headers,
    });

    return response.data.result;
  }

  static async logout(token) {
    const headers = {
      "Content-Type": "application/json",
      "X-Token": token,
    };

    await axios.delete("/api/v1/users/sign", {
      headers,
    });
  }
}

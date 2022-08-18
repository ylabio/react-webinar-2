import axios from "axios";

axios.defaults.baseURL = '/api/v1/';

const getConstructor = (url) => {
    return axios.get(url).then(r => {
        return r.data.result;
    }).catch(() => {
        return true;
    })
}

export const getItemById = async (id) => {
    return axios.get(`articles/${id}`);
}

export const getCountryById = async (id) => {
    return getConstructor(`countries/${id}`);
}

export const getCategoryById = async (id) => {
    return getConstructor(`categories/${id}`);
}

export const getItemList = async (limit, skip) => {
    return axios.get('/articles', {
        params: {
            limit: limit,
            skip: skip
        }
    }).then(r => {
        return r.data.result;
    })
}

export const getCountList = async () => {
    return axios.get('/articles?fields=items(*),count').then(r => {
        return r.data.result;
    })
}
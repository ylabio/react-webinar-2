import { axiosInstance } from './axiosInstance';
import { ITEMS_ON_PAGE } from '../render-data';

export const getArticles = async (skip) => {
  const responce = await axiosInstance
    .get(`articles?lang=ru&limit=${ITEMS_ON_PAGE}&skip=${skip}&fields=items(*),count`)
    .then((response) => response.data);
  return responce;
};

export const getArticleById = async (id) => {
  const responce = await axiosInstance
    .get(`articles/${id}?lang=ru`)
    .then((response) => response.data);
  return responce;
};

export const getCountryById = async (id) => {
  const responce = await axiosInstance
    .get(`countries/${id}?lang=ru&fields=*`)
    .then((response) => response.data);
  return responce;
};

export const getCategoryById = async (id) => {
  const responce = await axiosInstance
    .get(`categories/${id}?lang=ru&fields=*`)
    .then((response) => response.data);
  return responce;
};

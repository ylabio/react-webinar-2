import StateModule from "../module";
import qs from "qs";
import { map } from "lodash";

const QS_OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: "comma",
    encode: false,
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true,
  },
};

/**
 * Состояние каталога
 */
class CategoryState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    };
  }

  async initParams(params = {}) {}

  clearCategories() {
    this.setState({
      ...this.getState(),
      categories: [{ value: "", title: "Все" }],
    });
  }

  async getAllCategories() {
    this.clearCategories();
    const r = (depth) => {
        if (depth > 0) {
          return `name,title,parent(${r(depth - 1)})`
        } else {
          return "name,title"
        }
      };
      const categories = []
      const createCategories = (arr, i = 0, mark = "- ") => {
        arr.forEach((elem) => {
          if (elem.children) {
            categories.push({ title: `${mark.repeat(i)}${elem.title}`, value: elem._id })
            createCategories(elem.children, i + 1)
          } else {
            categories.push({ title: `${mark.repeat(i)}${elem.title}`, value: elem._id })
          }
        })
      };
  
      try {
        const response = await fetch(`api/v1/categories?limit=*&fields=items(*)`)
        const json = await response.json();
  
        const { items } = json.result;
  
        const result = Array.from(
          items.reduce((acc, o) => {
            let _id, name;
            if (o.parent) {
              [_id, name] = [o.parent._id, o.parent.name];
            }
  
            if (!acc.has(_id)) acc.set(_id, { _id, name }) // if the current item's parent doesn't exist, create it in the Map
  
            const parent = acc.get(_id) // get the current parent
  
            parent.children ??= [] // init children if it doesn't exist
  
            if (!acc.has(o._id)) acc.set(o._id, o) // add the current item to the Map if it doesn't exist
            else Object.assign(acc.get(o._id), o) // combine it with the existing object if it does
  
            parent.children.push(acc.get(o._id)) // add the item to the children
  
            return acc
          }, new Map()).values()
        ).filter(o => !o.hasOwnProperty('parent'))
  
        createCategories(result[0].children);
  
        // Установка полученных данных
        this.setState({
          ...this.getState(),
          categories
        }, "загрузка категорий");
      } catch(e) {
        console.log("load categories err", e)
      }
    }
  }

export default CategoryState;

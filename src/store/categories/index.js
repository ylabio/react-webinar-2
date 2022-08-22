import { deleteToken, getToken } from "../../service/auth";
import { getSelectOptions } from "../../service/filters";
import { getUserInfo } from "../../service/user";
import { getCookie, setCookie } from "../../utils/coockie";
import StateModule from "../module";

class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      options: [],
    };
  }

  async getCategories() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const res = await getSelectOptions();

      res.filter(v => !v.parent).map(v => fn(temp1, v, [])).reduce((acc, v) => [...acc, ...v], []).map(v => ({value: v._id, title: v.hash + v.title}));

      this.setState({
        ...this.getState(),
        waiting: false,
        options: res.result
      });
    } catch (error) {
        this.setState({
          ...this.getState(),
          waiting: false,
        });
    }
  }
}

export default CategoriesState;

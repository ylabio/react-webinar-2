import StateModule from '../module';
import { getArticleById, getCountryById, getCategoryById } from '../../utils/axios/requests';

class ItemInfoState extends StateModule {
  initState() {
    return {
      item: {},
      country: {},
      category: {},
    };
  }

  async getItemInfoById(id) {
    try {
      const item = this.store.getState().catalog.items.find((item) => item._id === id)
        ? this.store.getState().catalog.items.find((item) => item._id === id)
        : await getArticleById(id).then((responce) => responce.result);
      const country = await getCountryById(item.maidIn._id).then((responce) => responce.result);
      const category = await getCategoryById(item.category._id).then((responce) => responce.result);
      this.setState({ item, country, category });
    } catch (e) {
      console.log(e);
    }
  }
}

export default ItemInfoState;

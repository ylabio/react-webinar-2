import StateModule from '../module'

class ItemState extends StateModule {
  initState() {
    return {
      item: null
    }
  }

  async load(id) {
    const lang = this.store.get('lang').getState().lang

    const res = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)&lang=${lang}`)
    const {result} = await res.json()
    this.setState({
      item: {
        title: result.title,
        description: result.description,
        edition: result.edition,
        price: result.price,
        country: result.maidIn.title,
        category: result.category.title
      }
    })
  }
  
  unmount() {
    this.setState({
      item: null
    })
  }
}

export default ItemState
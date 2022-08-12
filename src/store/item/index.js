import StateModule from '../module'

class ItemState extends StateModule {
  initState() {
    return {
      item: null
    }
  }

  async load(id) {
    const res = await fetch(`/api/v1/articles/${id}?fields=category,description,edition,maidIn,price,title`)
    const {result} = await res.json()

    const countryRes = fetch(`/api/v1/countries/${result.maidIn._id}`).then(v => v.json()).then(v => v.result.title) 
    // Здесь я потерял 10 минут на то, чтобы заметить, 
    // что нужна горничная (maid в строке), а не то, откуда сделано (made)
    const categoryRes = fetch(`/api/v1/categories/${result.category._id}`).then(v => v.json()).then(v => v.result.title)
    const [country, category] = await Promise.all([countryRes, categoryRes])

    console.log(country)
    this.setState({
      item: {
        title: result.title,
        description: result.description,
        edition: result.edition,
        price: result.price,
        country,
        category
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
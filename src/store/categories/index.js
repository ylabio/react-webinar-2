import StateModule from "../module";

export default class CategoriesState extends StateModule {
  initState() {
    return {
      categories: []
    }
  }

  async getCategories() {
    const res = await fetch('/api/v1/categories')
    const data = await res.json()
    const mapped = data.result.items.map(el => ({
      id: el._id,
      title: el.title,
      parent: el.parent?._id
    }))
    
    for (let item of mapped) {
      if (!item.parent) continue
      let k = item.parent
      do {
        const tmp = mapped.find(elem => elem.id === k)
        item.title = '-' + item.title
        k = tmp.parent
      } while (k)
    }
    
    mapped.forEach((v, idx) => {
      if (v.parent) {
        mapped.splice(mapped.findIndex(el => el.id === v.parent) + 1, 0, v)
        mapped.splice(idx + 1, 1)
      }
    })

    this.setState({
      ...this.getState(),
      categories: mapped
    }, 'Установка категорий')
  }
}
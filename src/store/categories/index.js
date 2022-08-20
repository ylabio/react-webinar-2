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
    
    const prefixes = {}

    const children = { 0: [] }
    const root = { id: 0, nodes: tmp[0] }

    // Делаем дерево
    mapped.forEach((v) => {
      children[v.id] = children[v.id] || []
      children[v.parent || 0] = children[v.parent || 0] || []
      v.nodes = children[v.id]
      children[v.parent || 0].push(v)
    })
    
    // Делаем мапу с префиксами
    // Делаем рассчёт на основании уже имеющихся данных от родителя
    const prefixesMaker = (obj) => {
      for (let k of obj.nodes) {
        prefixes[k.id] = typeof prefixes[k.parent] !== 'undefined' ? prefixes[k.parent] + '-' : ''
        prefixesMaker(k)
      }
    }
    prefixesMaker(root)

    // Добавляем префиксы к title'ам
    mapped.forEach((v) => {
      v.title = prefixes[v.id] + v.title
    })

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
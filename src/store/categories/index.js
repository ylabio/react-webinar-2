import StateModule from "../module";

export default class CategoriesState extends StateModule {
  initState() {
    return {
      categories: []
    }
  }

  async getCategories() {
    const res = await fetch('/api/v1/categories?limit=*')
    const data = await res.json()
    const mapped = data.result.items.map(el => ({ // t = O(n) m = O(n) 
      id: el._id,
      title: el.title,
      parent: el.parent?._id
    }))
    
    const prefixes = {} // m = O(n)

    const children = { 0: [] } // m = O(n)
    const root = { id: 0, nodes: children[0] } // m = O(1)

    const sorted = [] // m = O(n)

    // Делаем дерево
    // t = O(n)
    mapped.forEach((v) => {
      children[v.id] = children[v.id] || []
      children[v.parent || 0] = children[v.parent || 0] || []
      v.nodes = children[v.id]
      children[v.parent || 0].push(v)
    })
    
    // Делаем мапу с префиксами, обходя дерево
    // Делаем рассчёт на основании уже имеющихся данных от родителя
    // Попутно сортируем, т.к. порядок при обходе - иерархический
    // t = O(n), так как в дереве все элементы в 1-м экземляре
    const prefixesMaker = (obj) => {
      for (let k of obj.nodes) {
        sorted.push(k)
        prefixes[k.id] = typeof prefixes[k.parent] !== 'undefined' ? prefixes[k.parent] + '- ' : ''
        prefixesMaker(k)
      }
    }
    prefixesMaker(root)

    // Добавляем префиксы к title'ам
    // t = O(n)
    sorted.forEach((v) => {
      v.title = prefixes[v.id] + v.title
    })


    // Итого: t = O(4n) ~ O(n), m = O(4n + 1) ~ O(n)
    this.setState({
      ...this.getState(),
      categories: sorted
    }, 'Установка категорий')
  }
}
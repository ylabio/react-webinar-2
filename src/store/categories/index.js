import StateModule from "../module";

export default class CategoriesState extends StateModule {
  initState() {
    return {
      categories: []
    }
  }

  async getCategories() {
    const res = await fetch('/api/v1/categories');
    const data = await res.json();
    const mapped = data.result.items.map(item => ({  
      id: item._id,
      title: item.title,
      parent: item.parent?._id
    }));
    const prefixes = {}; 
    const children = { 0: [] }; 
    const root = {id: 0, nodes: children[0]}; 
    const sorted = []; 
    
    mapped.forEach((el) => {
      children[el.id] = children[el.id] || []
      children[el.parent || 0] = children[el.parent || 0] || []
      el.nodes = children[el.id]
      children[el.parent || 0].push(el)
    })

    const prefixesMaker = (obj) => {
      for (let k of obj.nodes) {
        sorted.push(k)
        prefixes[k.id] = typeof prefixes[k.parent] !== 'undefined' ? prefixes[k.parent] + '-' : ''
        prefixesMaker(k)
      }
    }
    prefixesMaker(root)

    sorted.forEach((el) => {
      el.title = prefixes[el.id] + el.title
    })

    this.setState({
      ...this.getState(),
      categories: sorted
    }, 'Установка категорий')
  };
} 
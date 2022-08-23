import StateModule from "../module";

/**
 * Состояние меню фильтра
 */
class CategoriesState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      menu: [{_id: '', title: 'Все', value: ''}],

    };
  }

  /**
   * Устанвока параметров и загрузка списка товаров

   * @returns {Promise<void>}
   */
  async setCategories() {
    const response = await fetch(`/api/v1/categories?lang=ru&limit=*&fields=title, parent,_id`);
    const json = await response.json();

    const menu = []
    json.result.items.map(({title, _id, parent}) => {
      if (parent === null) {
        menu.push({title, _id, children: [], prefixMenu: 0})
      }
      if (parent) {
        const index = menu.findIndex((item) => item._id === parent._id)
        menu[index].children.push(_id)
        menu.push({title, _id, children: [], prefixMenu: menu[index].prefixMenu + 1})
      }
    })

    const sortMenu = [{_id: '', title: 'Все', value: ''}]
    menu.map(({title, _id, children, prefixMenu}) => {
      const index = sortMenu.findIndex(item => item._id === _id)
      if (index === -1) {
        sortMenu.push({_id, title, prefixMenu, value: _id})
      }

      if (children.length !== 0) {
        const subMenu = []
        const indexParentMenu = sortMenu.findIndex(item => item._id === _id)

        children.map(child => {
          const index = menu.findIndex(({_id}) => _id === child)
          const prefixesName = '-'.repeat(menu[index].prefixMenu)
          const newTitle = `${prefixesName} ${menu[index].title}`
          subMenu.push({_id: child, title: newTitle, value: child})
        })

        sortMenu.splice(indexParentMenu + 1, 0, ...subMenu)
      }
    })

    // Установка полученных данных и сброс признака загрузки
    this.setState({
      ...this.getState(),
      menu: sortMenu,
      waiting: false,
    });
  }
}

export default CategoriesState;

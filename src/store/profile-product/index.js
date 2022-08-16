import StateModule from "../module";

/**
 * Состояние каталога
 */
class ProfileProductState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: []
    };
  }

  async loadProductById(id) {

    try {
        return await (fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`)
            .then(result => result.json())
            .then(res => res.result)
            .then((res) => {
                this.setState({...res})
            }))

    } catch (error) {
        console.error(error)
    }

}

}

export default ProfileProductState;

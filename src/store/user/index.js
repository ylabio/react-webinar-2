import StateModule from "../module";

/**
 * Состояние товара
 */
class UserState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      name: '',
    };
  }

  setName(name) {
    this.setState({
      name
    });
  }
  
  removeName() {
    this.setState({
      name: ''
    });
  }
}

export default UserState;

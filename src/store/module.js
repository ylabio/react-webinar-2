class StateModule {

  /**
   * @param store {Store}
   * @param config {Object}
   */
  constructor(store, config) {
    this.store = store;
    this.config = config;
    this.services = store.services;
  }

  defaultConfig(){
    return {};
  }

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {};
  }

  getState() {
    return this.store.getState()[this.config.name];
  }

  setState(newState, description = 'setState'){
    this.store.setState({
      ...this.store.getState(),
      [this.config.name]: newState
    }, description)
  }

}

export default StateModule;

import APIService from './api';
import Store from './store';
import createStoreRedux from './store-redux';
import {translateService} from './translate';

class Services {
  constructor(config) {
    this.config = config;
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store() {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  /**
   * Сервис АПИ
   * @returns {APIService}
   */
  get api() {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Redux store
   */
  get storeRedux() {
    if (!this._storeRedux) {
      this._storeRedux = createStoreRedux(this, this.config.storeRedux);
    }
    return this._storeRedux;
  }

  get translate() {
    if (!this._translate) {
      this._translate = new translateService(this, this.config.translateService);
    }
    return this._translate;
  }
}

export default Services;

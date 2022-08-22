class APIService {

  /**
   * @param services {Services}
   */
  constructor(services) {
    this.services = services;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  /**
   * HTTP запрос
   * @param url
   * @param method
   * @param headers
   * @param options
   * @returns {Promise<any>}
   */
  async request({url, method = 'GET', headers = {}, ...options}) {
    const res = await fetch(url, {
      method,
      headers: {...this.defaultHeaders, ...headers},
      ...options,
    });
    return res.json();
  }

  /**
   * Установка или сброс токена в заголовках
   * @param token
   */
  setToken(token = null) {
    if (token) {
      this.defaultHeaders['X-Token'] = token;
    } else if (this.defaultHeaders['X-Token']) {
      delete this.defaultHeaders['X-Token'];
    }
  }
}

export default APIService;

/**
 * Настройки сервисов
 */
const config = {
  store: {
    log: false,

    modules: {
      session: {
        tokenHeader: 'X-Token'
      }
    }
  },

  api: {
    baseUrl: ''
  },

  translateService: {
    lang: 'ru'
  }
};

export default config;

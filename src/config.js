/**
 * Настройки сервисов
 */
const config = {
  store: {
    log: true,

    modules: {
      session: {
        tokenHeader: 'X-Token',
      },
    },
  },

  api: {
    baseUrl: '',
  },
};

export default config;

import * as locales from './locales.js';

export class translateService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      lang: 'ru',
      ...config
    };
  }

  t(text, plural) {
    const result =
      locales[this.config.lang] && typeof locales[this.config.lang][text] !== 'undefined'
        ? locales[this.config.lang][text]
        : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this.config.lang).select(plural);
      return result[key] || result;
    }

    return result;
  }

  setLang(lang) {
    this.config.lang = lang;
  }
}

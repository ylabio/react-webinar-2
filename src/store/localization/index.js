import pluralEn from 'plural';
import pluralRu from 'plural-ru';
import StateModule from '../module';
/**
 * Управление модальными окнами
 */
class LocalizationState extends StateModule {
  initState() {
    return {
      lang: 'ru'
    };
  }

  setLang(lang) {
    this.setState({
      ...this.getState(),
      lang: lang
    });
  }

  translate(path, amountForPlur = null) {
    const keys = path.split('.');
    const dict = require(`/localization/${this.getState().lang}.json`);
    const translated = keys.reduce((prev, cur) => prev[cur], dict);
    if (Array.isArray(translated) && amountForPlur !== null) {
      return this.#pluralize(amountForPlur, translated);
    }
    if (typeof translated === 'string') {
      return translated;
    }
    debugger;
    throw new Error('something wrong with local dict format');
  }

  #pluralize(amount, forms) {
    switch (this.getState().lang) {
      case 'ru':
        return pluralRu(amount, ...forms);

      case 'en':
        return pluralEn(...forms, amount);
    }
  }
}

export default LocalizationState;

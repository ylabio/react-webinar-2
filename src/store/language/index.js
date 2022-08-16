import ModuleState from '../module';
import getBrowserLang from '../../utils/get-browser-lang';
import langPack from '../../utils/lang-pack.json';

/**
 * Состояние языка на сайте
 */
class LanguageState extends ModuleState {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      currentLang: getBrowserLang(),
      langPack: langPack[getBrowserLang()]
    };
  }

  /**
   * Изменение текущего языка
   * @param checked {boolean}
   */
  switch(checked) {
    this.setState({
      currentLang: checked ? 'en' : 'ru',
      langPack: checked ? langPack.en : langPack.ru
    }, 'Изменение текущего языка');
  }
}

export default LanguageState;

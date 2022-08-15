import ModuleState from '../module';
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
      currentLang: 'RU',
      langPack: langPack.RU
    };
  }

  /**
   * Изменение текущего языка
   * @param checked {boolean}
   */
  switch(checked) {
    this.setState({
      currentLang: checked ? 'EN' : 'RU',
      langPack: checked ? langPack.EN : langPack.RU
    }, 'Изменение текущего языка');
  }
}

export default LanguageState;

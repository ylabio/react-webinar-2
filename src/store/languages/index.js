import StateModule from "../module";
import {englishDict} from './dictionaries/english';
import {russianDict} from './dictionaries/russian';

/**
 * Управление языком
 */
class LanguageState extends StateModule{

  initState() {
    return {
      name: localStorage.getItem('244sinfallStoreLanguage') ?? "russian"
    };
  }

  /**
   * Установка языка
   * @param language {String} Название нового языка
   */
  setLang(language){
    localStorage.setItem('244sinfallStoreLanguage', language)
    this.setState({
      name: language
    }, `Изменение языка на ${language}`);
  }
  getDict() {
    switch(this.getState().name) {
      case "english":
        return englishDict
      case "russian":
        return russianDict
      default:
        return russianDict
    }
  }
  /**
   * Получение новых слов
   * @param words {string} Слова из словаря
   */
  receive(...words){
    let output = {}
    let dict = this.getDict()
    for(let word of words) {
      output[word] = dict[word] ?? "Отсутствует перевод"
    }
    return output
  }
}

export default LanguageState;

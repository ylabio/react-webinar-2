import StateModule from "../module";
import LocalStorage from "../../services/local-storage";

const localStorageService =  new LocalStorage();
/**
 * Управление переводом
 */
class LanguageState extends StateModule{

  initState() {
    return {
      value: localStorageService.getLanguage()
    };
  }

  /**
   * Установка нового языка интерфейса
   * @param value {String}
   */
  changeLanguage(value){
    console.log(value);
    localStorageService.setLanguage(value);

    this.setState({
      value,
    }, `Новый язык интерфейса: ${value}`);
  }
}

export default LanguageState;

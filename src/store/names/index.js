import { enNames, ruNames } from "../../utils/names";
import StoreModule from "../module";

class NamesStore extends StoreModule {

  /**
   * Начальное состояние
   */
   initState() {
    return {
      names: ruNames,
      val: 'ru'
    };
  }

  /**
   * Изменение языка сайта
   */
   changeLanguage (value) {
   if (value === 'ru') {
     this.setState({
       names: ruNames,
       val: 'ru'
     });
   } else if (value === 'en') {
       this.setState({
         names: enNames,
         val: 'en'
       });
     }
  }
  
}

export default NamesStore;

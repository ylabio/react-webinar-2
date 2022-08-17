import StoreModule from "../module";

class NamesStore extends StoreModule {

  /**
   * Начальное состояние
   */
   initState() {
    return {
      val: 'ru'
    };
  }

  /**
   * Изменение языка сайта
   * @param value Код языка сайта
   */
   changeLanguage (value) {
   if (value === 'ru') {
     this.setState({
       val: 'ru'
     });
   } else if (value === 'en') {
       this.setState({
         val: 'en'
       });
     }
  }
  
}

export default NamesStore;

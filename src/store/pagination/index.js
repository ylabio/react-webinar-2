import StateModule from "../module";

/**
 * Номер страницы при пагинации
 */
class PaginationState extends StateModule{

  initState() {
    return {
      num: 1
    };
  }

  /**
   * получение номера страницы
   * @param name {String} Название модалки
   */
  paginationNumber(num){
    this.setState({
      num
    });
  }

}

export default PaginationState;

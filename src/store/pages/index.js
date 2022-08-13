import StateModule from "../module";

/**
 * Управление страницами
 */
class setPage extends StateModule{

  initState() {
    return {
      page: 1,
      skip: 0
    };
  }

  /**
   * устанвока страницы
   * @param page номер страницы @param skip поиска
   */
  setPage(page){
    const skip = (page * 10) - 10;
    this.setState({
      page,
      skip
    }, `Открытие страницы номер ${page}`);
  }
}

export default setPage;

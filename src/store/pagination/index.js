import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class PaginationState extends StateModule{

  initState() {
    return {
      itemsOnPage: 10,
      currentPage: 1,
    };
  }

  /**
   * Вычисление количества страниц
   * @param name {String}
   */
   async calculatePagesCount(itemsOnPage){
    let pages, itemsAmount

    const response = await fetch('/api/v1/articles?limit=1&fields=items(*),count');
    const json = await response.json();
    itemsAmount = json.result.count
    
    console.log(itemsAmount)
    if (itemsAmount % itemsOnPage === 0) {
      pages = itemsAmount / itemsOnPage
    } else {
      pages = Math.floor(itemsAmount / itemsOnPage) + 1
    }
    this.setState({
      ...this.store.state.pagination,
      pagesCount: pages
    }, `Вычисление количества страниц`);
    }

    
    /**
   * Переход на страницу
   * @param name {String}
   * 
   */
     goToPage(page) {
      this.setState({
        ...this.store.state.pagination,
        currentPage: page
      }, `Переход на страницу ${page}`);
     }

  }

export default PaginationState;

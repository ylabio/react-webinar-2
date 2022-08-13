import StateModule from "../module";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      currentPageNumber: 1, //текущий номер страницы по умолчанию 1
      items: [],
      itemsQty: null, //количество элементов
      limit: 10, //количество товарв на одной странице, можно менять - пагинация подстраивается. В интерфейс можно добавить переключатель для количества отображаемых страниц
      current : null
    };
  }

  /**
   * Загрузка необходимого количества страниц
   * @param pageNumber
   */
  async load(pageNumber = 1){
    const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${(pageNumber - 1) * this.getState().limit}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      current: null,
      currentPageNumber: pageNumber,
      items: json.result.items,
      itemsQty: json.result.count,
      limit: this.getState().limit
    });
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      items: this.getState().items.concat({_id, title, price, selected})
    }, 'Создание товара');
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      items: this.getState().items.filter(item => item._id !== _id)
    }, 'Удаление товара');
  }

  pagination(){
    const {itemsQty, currentPageNumber, limit} = this.getState();
    const pagesQty = Math.ceil(itemsQty/limit);


    let objectToReturn = {paginationArray: [], selected: currentPageNumber}
    // const objectToReturn = {paginationArray: [], selected: currentPageNumber}

    if (pagesQty > 4) { //слуай на 5 страниц и более
      if(currentPageNumber > 3 && currentPageNumber < pagesQty - 2){
        objectToReturn = {...objectToReturn, paginationArray: [1, '...', currentPageNumber - 1, currentPageNumber, currentPageNumber + 1 ,'...', pagesQty]}
        // objectToReturn.paginationArray = [1, '...', currentPageNumber - 1, currentPageNumber, currentPageNumber + 1 ,'...', pagesQty]
      } else if (currentPageNumber < 3 ){
        objectToReturn = {...objectToReturn, paginationArray: [1, 2 ,3, '...',  pagesQty] }
        // objectToReturn.paginationArray = [1, 2 ,3, '...',  pagesQty]
      } else if (currentPageNumber === 3) {
        objectToReturn = {...objectToReturn, paginationArray: [1, 2, 3, 4, '...', pagesQty]}
        // objectToReturn.paginationArray = [1, 2, 3, 4, '...', pagesQty]
      } else if (currentPageNumber === pagesQty - 2) {
        objectToReturn = {...objectToReturn, paginationArray: [1, '...', pagesQty - 3, pagesQty - 2, pagesQty - 1, pagesQty]}
        // objectToReturn.paginationArray = [1, '...', pagesQty - 3, pagesQty - 2, pagesQty - 1, pagesQty]
      }else if (currentPageNumber > pagesQty - 2 ) {
        objectToReturn = {...objectToReturn, paginationArray: [1, '...', pagesQty - 2, pagesQty - 1, pagesQty]}
        // objectToreturn.paginationArray = [1, '...', pagesQty - 2, pagesQty - 1, pagesQty]
      }
    } else { //случай до 4 страниц
      for (let i = 0; i < pagesQty ; i++){ 
        objectToReturn.paginationArray = [...objectToReturn.paginationArray, i + 1]
      }  
    }
    return objectToReturn;
  }
}

export default CatalogState;

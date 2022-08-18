export default function paginationCreator(itemsQty = 1, currentPageNumber = 1, limit = 1){
    const pagesQty = Math.ceil(itemsQty/limit);

    let objectToReturn = {paginationArray: [], selected: currentPageNumber}

    if (pagesQty > 4) { //слуай на 5 страниц и более
      if(currentPageNumber > 3 && currentPageNumber < pagesQty - 2){
        objectToReturn.paginationArray = [1, '...', currentPageNumber - 1, currentPageNumber, currentPageNumber + 1 ,'...', pagesQty]
      } else if (currentPageNumber < 3 ){
        objectToReturn.paginationArray = [1, 2 ,3, '...',  pagesQty]
      } else if (currentPageNumber === 3) {
        objectToReturn.paginationArray = [1, 2, 3, 4, '...', pagesQty]
      } else if (currentPageNumber === pagesQty - 2) {
        objectToReturn.paginationArray = [1, '...', pagesQty - 3, pagesQty - 2, pagesQty - 1, pagesQty]
      }else if (currentPageNumber > pagesQty - 2 ) {
        objectToReturn.paginationArray = [1, '...', pagesQty - 2, pagesQty - 1, pagesQty]
      }
    } else { //случай до 4 страниц
      for (let i = 0; i < pagesQty ; i++){ 
        objectToReturn.paginationArray = [...objectToReturn.paginationArray, i + 1]
      }  
    }
    return objectToReturn;
  }
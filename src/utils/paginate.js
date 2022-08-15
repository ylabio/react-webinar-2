//Функция, возвращающая массив для пагинации
export const paginate = (arr, page) => {
  let arrPagination;
  if (arr.length > 5) {
    if (page < 2) {
      arrPagination =[...arr.slice(0, 3), '...', arr[arr.length-1]];
    } else if (page === 2) {
        arrPagination = [...arr.slice(0, 4), '...', arr[arr.length-1]];
    } else if (page > 2 && page > arr.length - 3) {
        arrPagination = [arr[0], '...', ...arr.slice(arr.length - 3)];
    }
      else if (page === arr.length - 3) {
        arrPagination = [arr[0], '...', ...arr.slice(arr.length - 4)];
    } else if (page > 2 && page < arr.length - 3) {
        arrPagination = [arr[0], '...', ...arr.slice(page - 1, page + 2), '...', arr[arr.length - 1]];
    }  
  } else if (arr.length <= 4) {
        arrPagination = arr;
  } else if (arr.length === 5) {
      if (page < 2) {
        arrPagination=[...arr.slice(0, 3), "...", arr[arr.length - 1]]
      } else if (page === 2) {
          arrPagination = arr;
      } else if (page > 2) {
          arrPagination = [arr[0], '...', ...arr.slice(arr.length - 3)];
    } 
  }
  return arrPagination;
}
  
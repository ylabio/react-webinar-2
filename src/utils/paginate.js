//Функция, возвращающая массив для пагинации
export const paginate = (arr, ind) => {
  let arrPagination;
  if (arr.length > 5) {
    if (ind < 2) {
      arrPagination =[...arr.slice(0, 3), '...', arr[arr.length-1]];
    } else if (ind === 2) {
        arrPagination = [...arr.slice(0, 4), '...', arr[arr.length-1]];
    } else if (ind > 2 && ind > arr.length - 3) {
        arrPagination = [arr[0], '...', ...arr.slice(arr.length - 3)];
    }
      else if (ind === arr.length - 3) {
        arrPagination = [arr[0], '...', ...arr.slice(arr.length - 4)];
    } else if (ind > 2 && ind < arr.length - 3) {
        arrPagination = [arr[0], '...', ...arr.slice(ind - 1, ind + 2), '...', arr[arr.length - 1]];
    }  
  } else if (arr.length <= 4) {
        arrPagination = arr;
  } else if (arr.length === 5) {
      if (ind < 2) {
        arrPagination=[...arr.slice(0, 3), "...", arr[arr.length - 1]]
      } else if (ind === 2) {
          arrPagination = arr;
      } else if (ind > 2) {
          arrPagination = [arr[0], '...', ...arr.slice(arr.length - 3)];
    } 
  }
  return arrPagination;
}
  
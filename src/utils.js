/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function categoriesNumber(price){
  return String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
}

export function findIndex (array, el) {
  return (array.indexOf(el) + 1)
}
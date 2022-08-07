/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
};

/**
 * Создаёт массив уникальных значений исходного массива
 */
function arrFromSet(arrOfObj) {
  return Array.from(new Set(arrOfObj))
};

export {counter, arrFromSet}

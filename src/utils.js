/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * @param {Array<String>} forms
 * @param {Number} n
 * @returns {String}
 */
export function plural(forms, n) {
  let idx;
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    idx = 0; // few
  } else {
    idx = 1; // one
  }
  return forms[idx] || '';
}

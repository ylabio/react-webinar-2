/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function numberForm(num) {
  num += '';
  let res = ''
  for (let i = 0; i < num.length;) {
    if (i % 3 === 0) res = ' ' + res;
    res = num[num.length - ++i] + res;
  }
  return res.trim();
}

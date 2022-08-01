/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

export function addEnding(num) {
  let str = ''
  let str2 = String(num)[String(num).length - 1];
  
  if (num === 12 || num === 13 || num === 14) {
    str = "";
  } else if (+str2 === 2 || +str2 === 3 || +str2 === 4) {
    str = "a";
  } else {
    str = "";
  }
  return str;
}


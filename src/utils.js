/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

export function declensionWord(num) {

  const stringNum = String(num);
  if ((stringNum.includes('2') && stringNum.lastIndexOf('2') === stringNum.length - 1 && stringNum[stringNum.lastIndexOf('2') - 1] !== '1') ||
    (stringNum.includes('3') && stringNum.lastIndexOf('3') === stringNum.length - 1 && stringNum[stringNum.lastIndexOf('3') - 1] !== '1') ||
    (stringNum.includes('4') && stringNum.lastIndexOf('4') === stringNum.length - 1 && stringNum[stringNum.lastIndexOf('4') - 1] !== '1')) return 'раза';
  else return 'раз';
}

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

// Вариация №1 максимум условий
// export function declensionWord(num) {

//   const stringNum = String(num);
//   if ((stringNum.includes('2') && stringNum.lastIndexOf('2') === stringNum.length - 1 && stringNum[stringNum.lastIndexOf('2') - 1] !== '1') ||
//     (stringNum.includes('3') && stringNum.lastIndexOf('3') === stringNum.length - 1 && stringNum[stringNum.lastIndexOf('3') - 1] !== '1') ||
//     (stringNum.includes('4') && stringNum.lastIndexOf('4') === stringNum.length - 1 && stringNum[stringNum.lastIndexOf('4') - 1] !== '1')) return 'раза';
//   else return 'раз';
// }

// Вариация №2 упрощенная объектом
export function declensionWord(num) {
  if (!num) return;

  let stringNum = String(num);

  if (stringNum.length >= 2 && stringNum[stringNum.length - 2] === '1') return num + " раз"

  if (stringNum.length >= 2) stringNum = stringNum[stringNum.length - 1];

  return num + " " + { 0: 'раз', 1: 'раз', 2: 'раза', 3: 'раза', 4: 'раза', 5: 'раз', 6: 'раз', 7: 'раз', 8: 'раз', 9: 'раз' }[stringNum];
}



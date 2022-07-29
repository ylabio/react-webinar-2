/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getDeclension(value){
  const words = ['раз', 'раза', 'paз'];
  value = Math.abs(value) % 100;
  const num = value % 10;
  if(value > 10 && value < 20) return words[2];
  if(num > 1 && num < 5) return words[1];
  if(num === 1) return words[0];
  return words[2];
}

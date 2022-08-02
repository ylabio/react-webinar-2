/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export const showTimes = (fTimes) => {
  let times = "раз";
  const lastDigit = fTimes.toString()[fTimes.toString().length - 1];

  if((Number(lastDigit) == 2 && fTimes != 12) || (Number(lastDigit) == 3 && fTimes != 13) || (Number(lastDigit) == 4 && fTimes != 14)) times = "раза";
  else times = "раз";

  return times;
}
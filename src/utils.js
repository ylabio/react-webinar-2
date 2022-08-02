/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function countCases(number) {
  const casesArr = ['раз', 'раза']
  const lastDigit = number % 10
  if (number > 10 && number < 15) {
    return `| Выделялось ${number} ${casesArr[0]}`
  } else {
    switch (lastDigit) {
      case 2:
      case 3:
      case 4:
        return `| Выделялось ${number} ${casesArr[1]}` 
      default:
        return `| Выделялось ${number} ${casesArr[0]}`
    }
  }
}

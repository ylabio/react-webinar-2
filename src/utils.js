/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export function getDeclinationWord(number) {
  const numberString = String(number);
  const lastIndex = numberString.length - 1;

  const penultIndex = numberString.length > 1 ? numberString.length - 2 : null;

  const numberArr = ["2", "3", "4"];

  return numberArr.includes(numberString[lastIndex]) &&
    (numberString[penultIndex] !== "1" || penultIndex === null)
    ? "раза"
    : "раз";
}

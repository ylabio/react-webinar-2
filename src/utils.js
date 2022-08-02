/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export function endingsLetterA(num) {
  if (
    (String(num).slice(-1) === "2" && String(num).slice(-2) !== "12") ||
    (String(num).slice(-1) === "3" && String(num).slice(-2) !== "13") ||
    (String(num).slice(-1) === "4" && String(num).slice(-2) !== "14")
  ) {
    return "раза";
  }

  return "раз";
}

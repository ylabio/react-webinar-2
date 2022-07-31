/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export const sklonenie = (number, cases = [2, 0, 1, 1, 1, 2]) => (
    ["раз", "раза", "раз"][(number % 100 > 4 && number % 100 < 20)
        ? 2
        : cases[(number % 10 < 5)
            ? number % 10
            : 5]])

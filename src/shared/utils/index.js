/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
 export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function formatPrice(price) {
  const formatted = [];
  const rounded = Math.round(price);
  const arrayOfNumbers = Array
    .from(String(rounded))
    .reverse();
  const length = arrayOfNumbers.length;

  for (let i = 0; i < length; i++) {
    const current = arrayOfNumbers[i];
    const increased = i + 1;

    if (increased % 3 === 0) {
      formatted.push(current, ' ');
    } else {
      formatted.push(current);
    }
  }

  return formatted.reverse().join('');
}

export function getCartItems(goods) {
  const items = [];

  for (const item in goods) {
    const current = goods[item];
    items.push(current);
  }

  items.sort((a, b) => b.price - a.price);
  
  return items;
}
/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function toSpacedNum(value) {
  const v = String(value);

  if (!/^([0-9]+\.?[0-9]*)$/gm.test(v)) {
    return v;
  }

  const isNegative = /-/g.test(v);
  const dotIndex = v.indexOf('.');

  let whole = dotIndex !== -1 ? v.slice(0, dotIndex) : v;
  let fractPart = dotIndex !== -1 ? v.slice(dotIndex + 1) : '';

  if (whole.length < 5) {
    if (whole.length == 0) {
      return v;
    }

    return `${isNegative ? '-' : ''}${whole}${fractPart.length ? `.${fractPart}` : ''}`;
  }

  let numParts = [];
  let numPartBuff = '';

  for (let i = whole.length - 1; i >= 0; i--) {
    numPartBuff = whole[i] + numPartBuff;

    if (numPartBuff.length == 3) {
      numParts.unshift(numPartBuff);
      numPartBuff = '';
    }
  }

  if (numPartBuff.length) {
    numParts.unshift(numPartBuff);
  }

  return `${isNegative ? '-' : ''}${numParts.join(' ')}${fractPart.length ? `.${fractPart}` : ''}`;
}

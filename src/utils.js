/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getTimesEnd(countSelection){
  const endOn = () => {
    switch(countSelection) {
      case 12:
      case 13:
      case 14:
        return 'irregular exeption';
      default:
        return String(countSelection).slice(-1);
    }
  }

  switch (endOn()) {
    case '2':
    case '3':
    case '4':
      return 'раза';
    default:
      return 'раз';
  }
}
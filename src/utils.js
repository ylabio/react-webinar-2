/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getСonvertProps(props) {
  return Object.entries(props.reduce((acc, item) => {
    const key = item.title
    acc[key] = {...item, count: (acc[key]?.count || 0) + 1} 
    
    return acc
  }, {})).map(([, item]) => item)
}

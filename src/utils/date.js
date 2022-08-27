/**
 * Парсинг даты из ISO 8601
 * @param value
 * @returns {string}
 */
export default function date(value){
  const date = new Date(value);

  return `
    ${date.toLocaleDateString('default', {month: 'long', day: 'numeric'})} 
    ${date.getFullYear()} в 
    ${date.toLocaleTimeString('default', {hour: 'numeric', minute: 'numeric'})}
  `;
}

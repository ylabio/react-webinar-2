/**
 * Генерация search url
 * @param obj
 * @returns {string}
 */
 export default function objectToSearch(obj){
    return new URLSearchParams(obj).toString();
  }
  
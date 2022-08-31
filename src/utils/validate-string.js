// Превращает строку из пробелов в пустую строку
export const validateString = (text) => {
  let result = text.replace(/\s+/g, ' ');
  if (result === ' ') {
    result = '';
  }
  return result;
};

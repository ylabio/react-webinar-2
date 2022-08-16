/**
 * Принимает объект со словами на разных языках и значение нужного языка
 * Возвращает объект со словами на нужном языке
 * 
 * @returns {{}}
 */
export default function getText(dictionary, lang='rus') {
  const keys = Object.keys(dictionary);
  const text = {};
  for (const key of keys) {
    text[key] = dictionary[key][lang];
  }
  return text;
}

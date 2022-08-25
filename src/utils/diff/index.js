import isPlainObject from '../is-plain-object';

/**
 * Вовзращает иммутабельный объект, в котором не будет совпадений со вторым объектом
 * @param object1 {Object} Исходный обеъект
 * @param object2 {Object} Объект-маска
 * @returns {undefined|*}
 */
export default function diff(object1, object2) {
  if (isPlainObject(object1) && isPlainObject(object2)) {
    const result = {};
    const keys = Object.keys(object1);
    for (const key of keys) {
      if (object1[key] !== object2[key]) {
        const value = diff(object1[key], object2[key])
        if (typeof value !== "undefined") {
          result[key] = value;
        }
      }
    }
    return Object.keys(result).length ? result : undefined;
  } else {
    return object1;
  }
}

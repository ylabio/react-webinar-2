/**
 * Проверяет наличие записи в localStorage по переданному ключу, и вызывает callback, если запись присутствует
 * @param {String} itemInStorageName
 * @param {Function} callback
 */

export async function callMeIfPresentInStorage(itemInStorageName, callback) {
  const itemInStorage = localStorage.getItem(itemInStorageName);
  if (itemInStorage) {
    callback(itemInStorage);
  }
}

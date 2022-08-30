import countChildren from "./count-children";

export default function insertToTree(displayList, insertElem) {
  // Если добавили новый элемент и обновили store, ищем индекс родителя нового элемента
  // в хранимом массиве отображаемых элементов в ref
  const parentIndex = displayList.findIndex(item => item._id === insertElem.parent._id);
  // Формируем новый элемент для добавления в массив отображаемых
  // Если не нашли индекс родителя, значит родитель article 
  const newComment = {
    level: parentIndex === -1 ? 0 : displayList[parentIndex].level + 1,
    children: [], 
    ...insertElem
  };
  // Вставляем новый элемент в конец всей иерархии чилдренов его родителя, если он ответ
  // или после последнего комментария, если комментарий
  displayList.splice(parentIndex === -1 ? displayList.length : parentIndex + countChildren(displayList[parentIndex], displayList) + 1, 0, newComment);
  // Если новый элемент - ответ, то добавляем его в список чилдренов его родителя
  if (parentIndex !== -1) displayList[parentIndex].children.push(insertElem);
}
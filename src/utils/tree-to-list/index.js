import React from 'react';
import ListResetIndents from '../../components/list-reset-indents';

/**
 * Преобразование списка в иерархию.
 * @param tree {Array} Иерархия - список узлов со свойством children.
 * @param [callback] {Function} Для пользовательского преобразования элемента.
 * @param [level] {Number} Начальный уровень вложенности.
 * @param [result] {Array} Результат функции - используется рекурсией.
 * @returns {Array} Корневые узлы
 */
export default function treeToList(tree, callback, level = 0, result = []) {
  for (const item of tree) {
    result.push(callback ? callback(item, level) : item);
    if (item.children?.length)
      treeToList(item.children, callback, level + 1, result);
  }
  return result;
}
export function treeToListWithUlHtmlMarkup(
  tree,
  callback,
  level = 0,
  maxNesting = 15
) {
  const elems = tree.map(elem => (
    <li key={elem._id}>
      {callback(elem)}
      {elem?.children.length
        ? treeToListWithUlHtmlMarkup(elem.children, callback, level + 1)
        : null}
    </li>
  ));

  return (
    <>
      {level < maxNesting ? (
        <ul>{elems}</ul>
      ) : (
        <ListResetIndents>{elems}</ListResetIndents> // если уровень вложенности больше nesting, прекращаем оступы
      )}
    </>
  );
}

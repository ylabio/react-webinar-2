// сортирует комментарии в нужном порядке
// каждому добавляет .depth - ширину отступа слева

function getNestedComments(items, articleId) {

  function func(items, _id, depth = 0) {
    const result = [];

    items.forEach(item => {
      if (item.parent._id !== _id) return;

      result.push({ ...item, depth, });

      const children = func(items, item._id, depth + 1);

      if (children.length) result.push(...children);
    })

    return result;
  }

  return func(items, articleId);
}

export { getNestedComments };
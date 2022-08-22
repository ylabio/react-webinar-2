export default function categoriesHandler(categories) {
  // const parents = [];
  // categories.forEach((category) => {
  //   if (!category.parent) {
  //     parents.push(category);
  //   } else if (category.parent) {
  //   }
  // });
  const result = categories.map((category) => {
    if (!category.parent) {
      return { value: category._id, title: category.title };
    } else {
      return { value: category._id, title: `- ${category.title}` };
    }
  });
  return result;
}

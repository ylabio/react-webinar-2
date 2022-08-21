/**
 * Трансформация категорий
 * @param storeCategories
 * @returns {array}
 */
export default function transformCategories(storeCategories){
  const parentCategories = storeCategories.filter(category => !category.parent);
	let newArray = [];

	storeCategories.forEach(category => {
		newArray = parentCategories.map(categoryParent => {
			if(category?.parent?._id === categoryParent._id) {
				categoryParent.children = categoryParent.children ? [...categoryParent.children, {...category}] : [{...category}];
			}
			return categoryParent;
		});
	});

	return newArray;
}

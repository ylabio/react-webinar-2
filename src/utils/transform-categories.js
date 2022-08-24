/**
 * Трансформация категорий
 * @param storeCategories
 * @returns {newCategoriesay}
 */

export const transformCategories = (categories) => {
	const newCategories = [];
	let count = 0;

	categories.map((category) => {
			if(!category.parent) {
					newCategories.splice(count, 0, category);
					newCategories[count].groupNumNum = count + 1;
					count++;
			}
	})

	count = 0;

	const groupCategories = () => {
			let newCategoriesows = '';
			count++;

			for (let i = 1; i <= count; i++) {
					newCategoriesows = newCategoriesows + '- ';
			}

			categories.map((category) => {
					newCategories.map((item, index) => {
							if(item.groupNumNum === count && category.parent?._key === item._key) {
									newCategories.splice(index + 1, 0, category);
									newCategories[index + 1].groupNumNum = count + 1;
									newCategories[index + 1].title = newCategoriesows + newCategories[index + 1].title;
							}
					})
			})

			if (categories.length !== newCategories.length) {
					groupCategories.apply(this);
			}
	}

	groupCategories();

	return newCategories;
};
/**
 * Трансформация категорий
 * @param storeCategories
 * @returns {array}
 */

function arrayWithoutNesting(arrayWithNesting){
	let newArr = [];
	let delimiter = '';

	for(let i = 0; i < arrayWithNesting.length; i++) {
    if(Array.isArray(arrayWithNesting[i].children)) {
      const flat = arrayWithoutNesting(arrayWithNesting[i].children);
			arrayWithNesting[i].title = `${delimiter}${arrayWithNesting[i].title}`;
			newArr.push(arrayWithNesting[i]);

			for(let j = 0; j < flat.length; j++) {
				flat[j].title = `${delimiter}${flat[j].title}`;
				newArr.push(flat[j]);
			}
		} else {
      newArr.push(arrayWithNesting[i]);
    }
	}

	return newArr;
};

export default function transformCategories(storeCategories){
  const parentCategories = storeCategories.filter(category => !category.parent);

	for(let i = 0; i < storeCategories.length; i++) {
		for(let j = 0; j < parentCategories.length; j++) {
			if(storeCategories[i].parent?._id === parentCategories[j]._id) {
				parentCategories[j].children = parentCategories[j].children ? 
					[...parentCategories[j].children, {...storeCategories[i], title: `-${storeCategories[i].title}`}] :
					[{...storeCategories[i], title: `-${storeCategories[i].title}`}];
			}
		}
	}

	const newArrayWithoutNesting = arrayWithoutNesting(parentCategories);

	for(let i = 0; i < newArrayWithoutNesting.length; i++) {
		for(let j = 0; j < storeCategories.length; j++) {
			if(newArrayWithoutNesting[i].title === '-Телефоны') {
				if(storeCategories[j].title === 'Аксессуары') {
					newArrayWithoutNesting[i].children = [{...storeCategories[8], title: `---${storeCategories[8].title}`}, {...storeCategories[9], title: `---${storeCategories[9].title}`}];
				}
			}
		}
	}

	const result = arrayWithoutNesting(parentCategories);
	return result;
}

export default function sortCategories(categories) {
	var tree = [];
	var mappedArray = {};

	categories.forEach(function (category) {
		var id = category._id;
		if (!mappedArray.hasOwnProperty(id)) {
			mappedArray[id] = category;
			mappedArray[id].children = [];
		}
	});

	for (var id in mappedArray) {
		if (mappedArray.hasOwnProperty(id)) {
			let mappedElem = mappedArray[id];
			if (mappedElem.parent) {
				var parentId = mappedElem.parent._id;
				mappedArray[parentId]?.children.push(mappedElem);
			} else {
				tree.push(mappedElem);
			}
		}
	}

	function addDash(tree, dash = '') {
		var result = [];
		tree.forEach((item) => {
			result = [
				...result,
				{ value: item._id, title: dash + item.title },
				...(item.children && addDash(item.children, dash + ' - ')),
			];
		});
		return result;
	}

	return addDash(tree);
}

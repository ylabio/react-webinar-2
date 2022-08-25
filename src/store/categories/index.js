import StateModule from "../module";

/**
 * Состояние категорий
 */
class CategoriesState extends StateModule{

	/**
	 * Начальное состояние
	 * @return {Object}
	 */
	initState() {
		return {
			categories: [],
			category: {}
		};
	}

	/**
	 * Загрузка категорий
	 */
	async initCategories(){
		const getCategoryChildren = (items, parent, hyphen = ' - ') => {
			const children = items.filter(item => item?.parent?._id === parent._id);
			return children.reduce((categories, child) => {
				return [
					...categories,
					{value: child._id, title: hyphen + ' ' + child.title},
					...getCategoryChildren(items, child, hyphen + ' - '),
				]
			}, [])
		}

		const createCategories = (items) => {
			const categories = items.filter(item => !item.parent)
			return categories.reduce((categories, parent) => {
				return [
					...categories,
					{value: parent._id, title: parent.title},
					...getCategoryChildren(items, parent),
				]
			}, [{value: '', title: 'Все'}]);
		}

		await fetch( `/api/v1/categories`)
			.then(res => res.json())
			.then(res => {
				this.setState({...this.getState(), categories: createCategories(res.result.items)});
			});
	}
}

export default CategoriesState;
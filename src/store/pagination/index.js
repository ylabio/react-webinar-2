import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class PaginationState extends StateModule{

	initState() {
		return {
			skip: 0
		};
	}

	/**
	 * Установить сдвиг
	 */
	setSkip(skip){
		this.setState({skip: skip-1});
	}
}

export default PaginationState;
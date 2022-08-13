import StateModule from '../module';

class LocalizationState extends StateModule {
	/**
	 * Начальное состояние
	 * @return {Object}
	 */
	initState() {
		return {
			language: 'ru',
		};
	}

	changeLanguage(code) {
		this.setState({ language: code });
	}
}

export default LocalizationState;

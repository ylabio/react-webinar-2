import StateModule from "../module";

/**
 * Состояние профиля
 */
class ProfileState extends StateModule{

	/**
	 * Начальное состояние
	 * @return {Object}
	 */
	initState() {
		return {
			user: {}
		};
	}

	/**
	 * Установка данных пользователя
	 * @param user Данные пользователя
	 * @returns {void}
	 */
	setUser(user) {
		this.setState({
			user: user
		});
	}

	/**
	 * Получение данных пользователя по токену
	 * @param token токен
	 * @returns {Promise<void>}
	 */
	async self(token) {
		await fetch("/api/v1/users/self", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"X-Token": token
			}})
			.then(res => res.json())
			.then(res => {
				if (res.result) this.setUser(res.result)
			});
	}
}

export default ProfileState;
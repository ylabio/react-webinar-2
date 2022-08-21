import StateModule from "../module";

/**
 * Состояние авторизации
 */
class AuthState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      isAuth: false,
      user: {},
			authError: ''
    };
  }

  /**
   * Авторизация
   */
  async authorization(login, password){
    const response = await fetch('/api/v1/users/sign', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({login, password})
		});

		const json = await response.json();
		
		if(response.status === 200) {
			this.setState({
				...this.store.auth,
				isAuth: true,
				user: {
					name: json.result.user.profile.name,
					phone: json.result.user.profile.phone,
					email: json.result.user.email
				}
			})
			localStorage.setItem('token', json.result.token);
		} else {
			this.setState({
				...this.store.auth,
				authError: json.error.data.issues[0].message
			})
		}
  }
}

export default AuthState;

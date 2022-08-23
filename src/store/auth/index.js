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
				...this.getState(),
				isAuth: true
			})

			this.store.modules.profile.setUser({
				name: json.result.user.profile.name,
				phone: json.result.user.profile.phone,
				email: json.result.user.email
			})
			localStorage.setItem('token', json.result.token);
		} else {
			this.setState({
				...this.getState(),
				authError: json.error.data.issues[0].message
			})
		}
  }

	/**
   * Аутентификация
   */
  async authentication(){
    const response = await fetch('/api/v1/users/self', {
			headers: {'X-Token' : localStorage.getItem('token')}
		});

		const json = await response.json();

		if(response.status === 200) {
			this.setState({
				...this.getState(),
				isAuth: true
			})

			this.store.modules.profile.setUser({
				name: json.result.profile.name,
				phone: json.result.profile.phone,
				email: json.result.email
			})
		} else {
			this.setState({
				...this.getState(),
				authError: ''
			})
		}
  }

	/**
   * Логаут
   */
	async logout(){
    const response = await fetch('/api/v1/users/sign', {
			method: 'DELETE',
			headers: {'X-Token' : localStorage.getItem('token')},
			body: JSON.stringify({token: localStorage.getItem('token')})
		});

		const json = await response.json();

		if(json.result) {
			this.setState({
				...this.store.state.auth,
				isAuth: false,
				authError: ''
			})

			this.store.modules.profile.setUser({})
		} else {
			this.setState({
				...this.store.state.auth,
				authError: ''
			})
		}
  }
}

export default AuthState;

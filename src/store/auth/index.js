import StateModule from "../module";

class AuthState extends StateModule {

    initState() {
        return {
            data: {
                token: '',
                error: ''
            }
        }
    }

    async login({login, password}) {
        this.setState({
            ...this.getState(),
            data: {...this.getState().data, error: ''}
        })
        const response = await fetch(`api/v1/users/sign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login, password})
        })
        const json = await response.json()

        if (json.error) {
            this.setState({
                ...this.getState(),
                data: {...this.getState().data, error: 'Неверный логин или пароль'}
            })
        }

        if (json.result) {
            localStorage.setItem('access-token', json.result.token)
            this.setState({
                ...this.getState(),
                data: {
                    token: json.result.token,
                    error: ''
                }
            })
            await this.store.get('user').getCurrentUser()
        }
    }

    async logout() {
        const token = localStorage.getItem('access-token')
        const response = await fetch(`api/v1/users/sign`, {
            method: 'DELETE',
            headers: {
                'X-Token': token,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (json.result) {
            localStorage.removeItem('access-token')
            this.setState({
                data: {
                    token: '',
                    error: ''
                }
            })
        }
    }
}

export default AuthState
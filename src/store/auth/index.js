import StateModule from "../module";
import ArticleState from "../article";


class AuthState extends StateModule {
    initState() {
        return {
            user: null,
            token: '',
            isLoading: false,
            error: '',
            name: '',
            email: '',
            phone: '',
        };
    }


    async auth(login, password) {
        if (login === '' || password === '') {
            this.setState({
                ...this.getState(),
                error: 'Заполните все поля'
            })
        } else {
            this.setState({
                ...this.getState(),
                isLoading: true
            })
            await fetch(`/api/v1/users/sign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({login: login, password: password, remember: true})
            }).then(async (r) => {
                    if (r.ok) {
                        return r.json()
                    }
                    const error = await r.json();
                    throw new Error(error.error.message);
                }
            ).then((rJson) => {
                this.setState({
                    isLoading: false,
                    error: '',
                    user: rJson.result.user,
                    token: rJson.result.token,
                    name: rJson.result.user.profile.name
                })
                localStorage.setItem('token', rJson.result.token);
            }).catch((error) => {
                this.setState({
                    ...this.getState(),
                    isLoading: false,
                    error: error.message
                })
            });

        }
    }

    async updateUser(token) {
        this.setState({
            ...this.getState(),
            isLoading: true
        })
        await fetch(`/api/v1/users/self`, {
            method: 'GET',
            headers: {
                'X-Token': token,
                'Content-Type': 'application/json'
            }
        }).then((r) => {
            if (r.ok) {
                return r.json()
            }
        }).then((rJson) => {
            this.setState({
                ...this.getState(),
                isLoading: false,
                error: '',
                user: rJson.result,
                name: rJson.result.profile.name,
                token: token
            })
        }).catch(() => {
            // localStorage.removeItem('token');
        })
    }

    async exit() {
        this.setState({
            ...this.getState(),
            isLoading: true
        })

        await fetch(`/api/v1/users/sign`, {
            method: 'DELETE'
        }).then(() => {
            localStorage.removeItem('token');
            this.setState({
                user: null,
                token: '',
                isLoading: false,
                error: '',
                name: ''
            })
        }).catch(() => {
            this.setState({
                ...this.getState(),
                isLoading: false,
                error: 'Что-то пошло не так'
            })
        })
    }


    clearError() {
        this.setState({
            ...this.getState(),
            isLoading: false,
            error: ''
        })
    }
}

export default AuthState;

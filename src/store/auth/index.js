import StateModule from "../module";

const httpMethods = Object.freeze({
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE',
})

async function makeRequest({ api, method, body, headers }) {
    return await fetch(api, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(body),
    });
}

class AuthState extends StateModule {

    /**
     * Начальное состояние state
     * @return
     */
    initState() {
        return {
            token: '',
            isAuth: false,
            userInfo: {
                name: '',
                phone: '',
                email: '',
            },
            errorMsg: '',
        }
    }


    /**
     * Сбрасываем state
     */
    #resetState() {
        this.setState({
            token: '',
            isAuth: false,
            userInfo: {
                name: '',
                phone: '',
                email: '',
            },
            errorMsg: '',
        });
    }


    /**
     * Логин пользователя
     * @param {*} данные из формы (логин и пароль)
     */
    async login({ login, password }) {
        this.#resetState();

        const response = await makeRequest({
            api: '/api/v1/users/sign?fields=_id,email,profile(name,phone)',
            method: httpMethods.POST,
            body: { login, password, remember: true }
        });

        try {
            if (!response.ok) throw await response.json();

            console.log('Logging');
            const { result: { token, user } } = await response.json();
            this.setState({
                ...this.getState(),
                token,
                isAuth: true,
                userInfo: {
                    name: user.profile.name,
                    phone: user.profile.phone,
                    email: user.email,
                }
            });
        }
        catch ({ error }) {
            console.log(error)
            const errorMsg = error.data.issues.reduce((total, { message }) => total + message + ', ', '').slice(0, -2);
            console.log('Login error');
            this.setState({
                ...this.getState(),
                errorMsg,
            });
        }
    }

    /**
     * Выход 
     * @param {*} token 
     */
    async logout(token) {

        const response = await makeRequest({
            api: '/api/v1/users/sign',
            method: httpMethods.DELETE,
            headers: {
                'X-Token': token,
            }
        });
        const { result } = await response.json();

        if (result)
            this.#resetState();
    }

    /**
     * Получает данные профиля по токену
     * @param {*} token 
     */
    async getProfile(token) {
        const response = await makeRequest({
            api: '/api/v1/users/self',
            method: httpMethods.GET,
            headers: {
                'X-Token': token,
            }
        });

        if (response.ok) {
            const { result: { profile: { name, phone }, email } } = await response.json();

            this.setState({
                ...this.getState(),
                token,
                isAuth: true,
                userInfo: {
                    name,
                    phone,
                    email,
                }
            })
        } else {
            this.#resetState();
        }
    }
}

export default AuthState;

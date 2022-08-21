import StateModule from "../module";

/**
 * Состояние товара
 */
class LoginState extends StateModule{

    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            user: {},
            token: '',
            err: '',
            isAuth: false,
            waiting: false,
        };
    }


    async checkLogin() {
        this.setState({
            ...this.getState(),
            token: localStorage.getItem('token') || '',
            isAuth: !!localStorage.getItem('token'),
            err: '',
            waiting: true,
        });

        if (this.getState().isAuth) {
            const response = await fetch(`/api/v1/users/self`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Token': `${this.getState().token}`
                },
            });
            const json = await response.json();

            if (json.result._id) {
                this.setState({
                    ...this.getState(),
                    user: json.result,
                    err: '',
                    waiting: false
                });
            }
        } else {
            this.setState({
                ...this.getState(),
                waiting: false
            });
        }
    }

    async logIn (data){
        this.setState({
            ...this.getState(),
            user: {},
            waiting: true
        });

        try {
            const response = await fetch(`/api/v1/users/sign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();

            if (json.result.token) {
                localStorage.setItem('token', json.result.token);

                this.setState({
                    user: json.result.user,
                    token: json.result.token,
                    isAuth: true,
                    err: '',
                    waiting: false
                });
            }
        } catch (e){

            this.setState({
                err: e,
                user: '',
                token: '',
                isAuth: false,
                waiting: false
            });
            console.log(this.state.err)
        }
    }

    async logOut (token){
        this.setState({
            ...this.getState(),
            waiting: true,
        });

        try {
            const response = await fetch(`/api/v1/users/sign`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Token': `${token}`
                },
            });
            const json = await response.json();

            if (json.result) {
                localStorage.removeItem('token');
                this.setState({
                    user: {},
                    token: '',
                    isAuth: false,
                    err: '',
                    waiting: false
                });
            }
        } catch (e){
            this.setState({
                ...this.getState(),
                isAuth: false,
                err: e,
                waiting: false
            })

        }
    }
}

export default LoginState;
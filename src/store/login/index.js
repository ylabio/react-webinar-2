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


    async checkLogin(token) {
        this.setState({
            ...this.getState(),
            err: '',
            waiting: true,
        });

        const response = await fetch(`/api/v1/users/self`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': `${token}`
            },
        });
        const json = await response.json();

        if (!!json.result) {
            this.setState({
                ...this.getState(),
                token: token,
                user: json.result,
                isAuth: true,
                waiting: false
            });
        } else {
            this.setState({
                ...this.getState(),
                token: '',
                user: {},
                isAuth: false,
                waiting: false
            });

            localStorage.removeItem('token');
        }
    }

    async logIn (data){
        this.setState({
            ...this.getState(),
            err: '',
            waiting: true
        });

            const response = await fetch(`/api/v1/users/sign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
        if(json.error) {
            const errors = json.error.data.issues.reduce((arr, item) => {
                    arr.push(item.message);
                    return arr;
                }, []
            ).join(', ')
            this.setState({
                ...this.getState(),
                err: errors,
                isAuth: false,
                waiting: false
            });
        }

            if (json.result.token) {
                localStorage.setItem('token', json.result.token);
                this.setState({
                    ...this.getState(),
                    user: json.result.user,
                    token: json.result.token,
                    isAuth: true,
                    waiting: false
                });
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

    clearErr(){
        this.setState({
            ...this.getState(),
            err: ''
        })
    }
}

export default LoginState;
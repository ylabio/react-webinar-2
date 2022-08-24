import StateModule from "../module";

/**
 * Состояние товара
 */
class LoginFormState extends StateModule{


    initState() {
        return {
            user: {
                login: '',
                password: ''
            },
        };
    }


    setLogin(login) {
        this.setState({
            user: {
                ...this.getState(),
                login
            }
        })
    }

    setPassword(password) {
        this.setState({
            user: {
                ...this.getState(),
                password
            }
        })
    }

}

export default LoginFormState;
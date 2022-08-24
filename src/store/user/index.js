import StateModule from "../module";

class UserState extends StateModule{
    initState() {
        const userToken = localStorage.getItem('token');

        if (userToken !== null) {
            this.getUserProfile(userToken)
        }

        return {
            isAuthorized: userToken !== null,
            token: userToken || '',
            userData: null,
        };
    }

    async getUserToken (params = {}) {
        const response = await fetch('/api/v1/users/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })

        const json = await response.json();

        if (json.result) {
            localStorage.setItem('token', json.result.token)

            // Установка полученных данных и сброс признака загрузки
            this.setState({
                ...this.getState(),
                token: json.result.token,
                userData: json.result.user,
                isAuthorized: true,
            });
        } else {
            throw new Error(json.error.code)
        }
    }

    async getUserProfile (userToken) {
        const response = await fetch('/api/v1/users/self', {
            headers: {
                'X-Token': userToken
            }
        });
        const json = await response.json();

        if (json.result) {
            this.setState({
                ...this.getState(),
                userData: json.result,
            });
        } else {
            await this.logout(userToken)
        }
    }

    async logout(userToken) {
        await fetch('/api/v1/users/sign', {method: 'DELETE',
            headers: {
                'X-Token': userToken
            }})
        localStorage.removeItem('token')
        this.setState(this.initState())
    }
}

export default UserState;

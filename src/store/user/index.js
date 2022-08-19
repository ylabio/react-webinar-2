import StateModule from "../module";

class UserState extends StateModule{
    initState() {
        return {
            isAuthorized: false,
            token: '',
            // userData: {}
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


        // Установка полученных данных и сброс признака загрузки
        this.setState({
            ...this.getState(),
            token: json.result.token,
            isAuthorized: true,
        });
    }

    // async getUserProfile () {
    //     const response = await fetch('/api/v1/users/self', {
    //         headers: {
    //             'X-Token': this.getState().token
    //         }
    //     });
    //     const json = await response.json();
    //
    //     this.setState({
    //         ...this.getState(),
    //         userData: json.result,
    //     });
    // }
}

export default UserState;
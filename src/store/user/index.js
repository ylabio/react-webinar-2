import StateModule from "../module";

class UserState extends StateModule {

    initState() {
        return {
            profile: {
                name: '',
                phone: '',
                email: ''
            },
            error: ''
        }
    }

    async login({login, password}) {
        this.setState({
            ...this.getState(),
            error: ''
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
                error: json.error.message
            })
        }

        if (json.result) {
            localStorage.setItem('access-token', json.result.token)
            this.setState({
                ...this.getState(),
                profile: {
                    name: json.result.user.profile.name,
                    phone: json.result.user.profile.phone,
                    email: json.result.user.email
                }
            })
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
                profile: {
                    name: '',
                    phone: '',
                    email: ''
                },
                error: ''
            })
        }
    }

    async getCurrentUser() {
        const token = localStorage.getItem('access-token')
        if (token) {
            const response = await fetch(`/api/v1/users/self`, {
                method: 'GET',
                headers: {
                    'X-Token': token,
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            if (json.result) {
                this.setState({
                    ...this.getState(),
                    profile: {
                        name: json.result.profile.name,
                        phone: json.result.profile.phone,
                        email: json.result.email
                    }
                })
            }
        }
    }
}

export default UserState
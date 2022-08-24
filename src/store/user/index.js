import StateModule from "../module";

class UserState extends StateModule {

    initState() {
        return {
            profile: {
                name: '',
                phone: '',
                email: ''
            }
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

    cleanUserData(){
        this.setState({
            profile: {
                name: '',
                phone: '',
                email: ''
            }
        })
    }
}

export default UserState
import StateModule from "../module";

class Authorization extends StateModule {


    initState() {
        return {
            login: '',
            password: '',
            name: '',
            email: '',
            phone: '',
            error: ''
        };
    }

    setUser(credentials = {}) {
        const newUser = { ...this.getState(), ...credentials }


        this.setState({
            ...this.getState(),
            ...newUser,
        });

    }

    async userAuthorization(e) {
        e.preventDefault();

        const { login, password } = this.getState();
        if (!login || !password) return;


        try {

            const promUser = await fetch("/api/v1/users/sign", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "login": `${login}`,
                    "password": `${password}`
                })
            })

            const user = await promUser.json();

            if (user.error) this.setUser({ ...this.getState(), error: user.error.data.issues[0].message })
            else {
                this.setUser({
                    login: '', password: '', error: '', name: user.result.user.profile.name,
                    email: user.result.user.email, phone: user.result.user.profile.phone
                });
                window.localStorage.clear();
                window.localStorage.setItem('token', user.result.token);
            }
        }
        catch (err) {
            alert("Не удалось подключится к серверу")
        }
    }



    async choiceProfile() {
        if (window.localStorage.length === 0) return;


        try {

            const token = window.localStorage.getItem('token');
            const choiceUser = await fetch("/api/v1/users/self", {
                method: 'GET',
                headers: {
                    'X-Token': `${token}`,
                    'Content-Type': 'application/json'
                },
            });

            const user = await choiceUser.json();

            this.setUser({
                login: '', password: '', error: '', name: user.result.profile.name,
                email: user.result.email, phone: user.result.profile.phone
            });
        }
        catch (err) {
            alert("Не удалось подключится к серверу")
        }
    }

    async logOut() {

        try {

            const token = window.localStorage.getItem('token');
            await fetch("/api/v1/users/sign", {
                method: 'DELETE',
                headers: {
                    'X-Token': `${token}`,
                    'Content-Type': 'application/json'
                },
            });

            window.localStorage.clear();
            this.setUser(this.initState());
        }
        catch (err) {
            alert("Не удалось подключится к серверу")
        }

    }
}

export default Authorization;
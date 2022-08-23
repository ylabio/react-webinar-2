import { useNavigate } from "react-router-dom";
import StateModule from "../module";
class User extends StateModule {
    initState() {
        return {
            user: {
                error: false,
                token: localStorage.getItem('token') || '',
                userName: '',
                telephone: '',
                email: '',
                auth: false,
            }
        };
    }
    //
    /**
     * Логин пользователя 
     * @param data (data.login , data.password)
     * 
     */
    async loginUser(data) {
        this.setState({
            ...this.getState(),
            user: {
                ...this.initState().user, auth: true
                //меняю auth,так как повесил на кнопку disabled
                //чтоб пользователь со слабым интернетом не мог нажимать на кнопку
                //если поменять Network на Slow 3G,то можно будет успевать понажимать
            },
        });

        const loginData = data.login
        const passwordData = data.password
        const response = await fetch(
            `/api/v1/users/sign`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ login: loginData, password: passwordData })
        }
        )
        if (!loginData || !passwordData) {
            this.setState({
                ...this.getState(),
                user: { ...this.initState().user, error: `Заполните форму`, auth: false },
            });
            throw new Error(`Not login or password`)
        }

        if (!response.ok) {

            this.setState({
                ...this.getState(),
                user: { ...this.initState().user, error: `Ошибка ${response.status} - ${response.statusText}`, auth: false },

            });
            throw new Error(`Could not fetch `)
        }
        const json = await response.json()

        localStorage.setItem('token', await json.result.token)
        const profile = await json.result.user.profile
        this.setState({
            ...this.getState(),
            user: {
                ...this.initState().user, error: false,
                token: json.result.token, userName: profile.name,
                telephone: profile.phone, email: json.result.user.email, auth: true
            },
        });



    }
    /**
   * Проверка пользователя
   * @param token
   * 
   */
    async checkUser(token) {

        const cheeck = await fetch(
            `/api/v1/users/self`, {
            method: 'GET',
            headers: {
                'X-Token': token,
                'content-type': 'application/json'

            }
        }

        )
        if (cheeck.ok) {
            const response = await cheeck.json()
            const userInfo = await response.result
            localStorage.setItem('name', userInfo.profile.name)
            this.setState({
                ...this.getState(),
                user: {
                    ...this.initState().user, error: false,
                    userName: userInfo.profile.name, telephone: userInfo.profile.phone,
                    email: userInfo.email, auth: true
                },
            });
        }
        else {
            throw new Error(`Проблема сети`)
        }

    }
    /**
* удалить token пользователя  (выход из аккаунта)
* @param token
* 
*/
    async deleteUser(token) {

        const cheeck = await fetch(
            `/api/v1/users/sign`, {
            method: 'DELETE',
            headers: {
                'X-Token': token,
                'content-type': 'application/json'

            }
        }

        )
        const response = await cheeck.json()
        if (response.result) {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            this.setState({
                ...this.getState(),
                user: {
                    ...this.initState().user, auth: false
                },
            });
        } else {
            throw new Error(`Не удалось выйти`)
        }



    }
}
export default User
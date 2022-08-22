import { useNavigate } from "react-router-dom";
import StateModule from "../module";
class User extends StateModule {
    initState() {
        return {
            user: {
                error: false,
                token:localStorage.getItem('token')||'',
                userName: '',
                telephone: '',
                email: ''
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
        if(!response.ok){
            this.setState({
                ...this.getState(),
                user: { ...this.initState().user, error: true },

            });
            throw new Error(`Could not fetch `)
        }
            const json = await response.json()
            
            localStorage.setItem('token',json.result.token)
            const profile = await json.result.user.profile
            this.setState({
                ...this.getState(),
                user: {
                    ...this.initState().user, error: false,
                    token: json.result.token, userName: profile.name,
                    telephone: profile.phone, email: json.result.user.email
                },
            });
        
  

    }
    /**
   * Проверка пользователя
   * @param token
   * 
   */
    async exitUser(token) {
        const cheeck = await fetch(
            `/api/v1/users/self`, {
            method: 'GET',
            headers: {
                'X-Token': token,
                'content-type': 'application/json'

            }
        }

        )
        const response = await cheeck.json()
        console.log(response);
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
        localStorage.removeItem('token')
        const response = await cheeck.json()
        console.log(response);
    }
}
export default User
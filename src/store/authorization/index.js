import StateModule from "../module"
import getCookie from "../../utils/getCookie";
import { deleteCookie } from "../../utils/getCookie";

class Authorization extends StateModule{
    
    async initState(){
        const token = getCookie("token");

        this.setState({
            error: false,
            isAuth: false,
            token: null,
            user: {},
            waiting: false
        })

        if(token){

            this.setState({
                ...this.getState,
                waiting: true
            })

            let response = await fetch('/api/v1/users/self' , {method: 'GET', headers: {'Content-Type': 'application/json', 'X-token':`${token}`}})
            let result = await response.json();
            
            this.setState({ 
                error: false,
                token, 
                user: result.result, 
                isAuth : true,
                waiting: false
            })
        }
        
    }
        

    async login({login, password}){
        this.setState({
            ...this.getState,
            waiting: true
        })
        try{
            let response = await fetch('/api/v1/users/sign' , {method: 'POST', headers: {'Content-Type': 'application/json'}, body : JSON.stringify({"login": login, "password": password})})
            let result = await response.json();

            if(response.ok){
                this.setState({
                    error: false,
                    isAuth: true,
                    token: result.result.token,
                    user: result.result.user,
                    waiting: false
                })
            } else {
                throw result.error
            }
        } catch(e) {
            this.setState({
                error: e,
                isAuth: false,
                token: null,
                user: {},
                waiting: false
            })

        }
    }

    async logout(){
        deleteCookie('token');
        this.setState({...this.initState()});

        let response = await fetch('/api/v1/users/sign' , {method: 'DELETE', headers: {'Content-Type': 'application/json', 'X-Token' : `${this.getState().token}`}})
        let result = await response.json();

    }

}

export default Authorization
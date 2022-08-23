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
            user: {}
        })

        if(token){
            let response = await fetch('/api/v1/users/self' , {method: 'GET', headers: {'Content-Type': 'application/json', 'X-token':`${token}`}})
            let result = await response.json();
            
            this.setState({ 
                error: false,
                token, 
                user: result.result, 
                isAuth : true, 
            })
        }
        
    }
        

    async login({login, password}){
        try{
            let response = await fetch('/api/v1/users/sign' , {method: 'POST', headers: {'Content-Type': 'application/json'}, body : JSON.stringify({"login": login, "password": password})})
            let result = await response.json();

            if(response.ok){
                this.setState({
                    error: false,
                    isAuth: true,
                    token: result.result.token,
                    user: result.result.user,
                })
            } else {
                throw result.error
            }
        } catch(e) {
            this.setState({
                error: e,
                isAuth: false,
                token: null,
                user: {}
            })

        }
    }

    logout(){
        deleteCookie('token');
        this.setState({...this.initState()});

    }

}

export default Authorization
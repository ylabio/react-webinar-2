import StateModule from "../module";
import getCookie from "../../utils/getCookie";

class Profile extends StateModule{

    async initState(){
        const token = getCookie("token");

        this.setState({
            ...this.getState(),
            token,
            user: {},
            waiting: true
        })

        if(token){

            let response = await fetch('/api/v1/users/self' , {method: 'GET', headers: {'Content-Type': 'application/json', 'X-token':`${token}`}})
            let result = await response.json();
            
            this.setState({
                ...this.getState(),
                token,  
                user: result.result,
                waiting: false
            })
        } else {
            this.setState({
                ...this.getState(),
                token,
                user: {},
                waiting: false
            })
        }
    }

}


export default Profile
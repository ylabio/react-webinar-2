import ModalsState from "../modals";
import qs from '../../utils/search-params';

class Comments extends ModalsState{

    async setComments(artickleId){
        const apiParams = {serch:{query:`${artickleId}`}};
        const json = await this.services.api.request({url: `/api/v1/comments${qs.stringify(apiParams)}`});
        console.log(json);
    }
}

export default Comments
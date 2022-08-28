import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

export default {
	load: (_id) => {
		return async (dispatch, getState, services) => {
			dispatch({type: 'comments/load'});

			try {
        const json = await services.api.request({url: `/api/v1/comments?search[parent]=${_id}&limit=*&fields=_id,dateCreate,text,parent(*),author(username)`});
				
				const transformComments = ([
					...treeToList(
						listToTree(json.result.items),
						(item, level) => ({_id: item._id, text: item.text, dateCreate: item.dateCreate, author: item.author, lvl: level})
					)
				]);
				
        dispatch({type: 'comments/load-success', payload: transformComments});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
		}
	}
}
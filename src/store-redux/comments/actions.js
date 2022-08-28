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
	},
	newComment: (_id, text, _type, lvl, author, itemIndex) => {
		return async (dispatch, getState, services) => {
			dispatch({type: 'comments/post-new-comment'});
			
			try {
        const newComment = {
          text,
          parent: {
              _id,
              _type
          }
        };
        
        const json = await services.api.request({url: '/api/v1/comments', method: 'POST', body: JSON.stringify(newComment)});
				
				dispatch({type: 'comments/add-new-comment', payload: {...json.result, lvl, author, itemIndex}});

      } catch (e){
        // dispatch({type: 'comments/load-error'});
      }
		}
	},
	setActiveKey: (key) => ({type: 'comments/set-active-form', payload: key})
}
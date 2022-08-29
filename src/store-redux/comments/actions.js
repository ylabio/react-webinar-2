import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import generateIDs from "../../utils/genIDs";

export default {

    loadComments: (_id, article) => {
        return async (dispatch, getState, services) => {
            dispatch({ type: 'comments/load-comments', })

            try {
                const jsonCom = await services.api.request({ url: `/api/v1/comments?search[parent]=${_id}&limit=*` });
                const items = jsonCom.result.items;
                let comments;
                if (items) {
                    comments = treeToList(listToTree([article, ...items]),
                        (item, level) => ({ ...item, dateCreate: item.dateCreate, text: item.text, author: item.author, nesting: '+'.repeat(level) }));
                    comments.shift();
                    if (comments.length) {
                        const { result } = await services.api.request({ url: `api/v1/users?search[query]=${[...new Set(comments.map(user => user.author._id))].join('|')}` });
                        const { items } = result;
                        comments.forEach(comment => {
                            comment.author = items.find(user => user._id === comment.author._id)?.profile.name;


                        })
                    }
                }

                dispatch({ type: 'comments/load-comments-success', comLoad: { data: comments } });

            } catch (e) {
                console.log(e);

                // Ошибка при загрузке
                dispatch({ type: 'comments/load-comments-error' });
            }
        }
    },

    sendComment: (text, parent) => {
        return async (dispatch, getState, services) => {
            if (!text) return;
            dispatch({ type: 'comments/send' })
            const _id = generateIDs();
            try {
                const message = await services.api.request({ url: `/api/v1/comments`, method: "POST", body: JSON.stringify({ _id, text, parent }) });

                dispatch({ type: 'comments/send-success', lastCommented: message.result.dateCreate })
            }
            catch (e) {

                dispatch({ type: 'comments/send-error' })
            }
        }
    }
}
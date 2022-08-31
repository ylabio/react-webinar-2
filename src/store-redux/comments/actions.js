import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import generateIDs from "../../utils/genIDs";
import commentItem from "../../components/comment-item";

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
            if (!text.trim()) return;
            dispatch({ type: 'comments/send' })
            const _id = generateIDs();
            try {
                const message = await services.api.request({ url: `/api/v1/comments`, method: "POST", body: JSON.stringify({ _id, text, parent }) });

                const comments = [...getState().comments.comData];

                let indexComment;
                indexComment = comments.findLastIndex(comment => comment.parent._id === parent._id);

                if (indexComment === -1) indexComment = comments.findIndex(comment => comment._id === parent._id);


                message.result.author = services._store.state.session.user.profile.name;
                message.result.nesting = parent.nesting + 1 || "+"
                message.result.nesting.replace("1", "+");


                if (indexComment === -1) comments.push(message.result);
                else comments.splice((indexComment + 1), 0, message.result);


                console.log(parent._id);
                console.log(comments);

                dispatch({ type: 'comments/send-success', newComments: comments })
            }
            catch (e) {
                console.log(e);

                dispatch({ type: 'comments/send-error' })
            }
        }
    }
}
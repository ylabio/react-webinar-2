import React, { useCallback, useMemo, useState } from "react";
import { useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual } from "react-redux";
import useInit from "../../hooks/use-init";
import actionsComments from '../../store-redux/comments/actions';
import CommentsList from "../../components/comments-list";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import CommentsAdd from "../../components/coments-add"
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";

function Comments() {
    const storeRedux = useStoreRedux();
    const { exists } = useSelector(state => ({
        exists: state.session.exists
    }))
    const select = useSelectorRedux(state => ({
        id: state.article.data._id,
        comments: state.comments.data.items,
        waiting: state.comments.newComment.waiting,
        newComParent: state.comments.newComment.parent,
        spinnerWaiting: state.comments.waiting
    }), shallowEqual);

    const [text, setText] = useState("");

    useInit(async () => {
        //await store.get('article').load(params.id);
        select.id && storeRedux.dispatch(actionsComments.load(select.id));
    }, [select.id]);

    const options = {
        //массив всех комментариев
        comments: useMemo(() => [
            ...treeToList(
                listToTree(select.comments || [], "_id", select.id),
                (item, level) => ({ ...item, level })
            )
        ], [select.comments])
    }

    const callbacks = {
        //написание комментария
        onChange: useCallback((value) => {
            setText(value);
        }, []),

        //отправка комментария
        onSubmit: useCallback(async () => {
            if (text.split(/\s/).join("")) {
                if (select.newComParent) {
                    //"await" не влияет на тип этого выражения. не верьте, на самом деле влияет (с ним форма комментария пропадет только после ответа от сервера)
                    await storeRedux.dispatch(actionsComments.addComment(text, select.newComParent, "comment"));
                    storeRedux.dispatch(actionsComments.changeNewComParent(""));
                } else {
                    storeRedux.dispatch(actionsComments.addComment(text, select.id));
                }
                setText("");
            }
        }, [text]),

        //начать ответет другому коментатору
        onReplyClick: useCallback((parent) => {
            storeRedux.dispatch(actionsComments.changeNewComParent(parent));
            //setText("")  //както неудобно
        }, []),

        //сброс ответа на комментарий
        onCancelClick: useCallback(() => {
            storeRedux.dispatch(actionsComments.changeNewComParent(""));
            setText("");
        })
    };

    const renders = {
        commentsAdd: useCallback((whomToAnswer) => (
            <CommentsAdd
                exists={exists}
                text={text}
                waiting={select.waiting}
                onSubmit={callbacks.onSubmit}
                onChange={callbacks.onChange}
                onClick={callbacks.onCancelClick}
                name={whomToAnswer}
            />
        ), [exists, text, select.waiting, callbacks.onSubmit, callbacks.onChange, callbacks.onClick]),
    }

    return (
        <Spinner active={select.spinnerWaiting}>
            <CommentsList items={options.comments}
                commentsAdd={renders.commentsAdd}
                onClick={callbacks.onReplyClick}
                newComParent={select.newComParent}
                exists={exists} />
        </Spinner>
    )
}

export default React.memo(Comments);

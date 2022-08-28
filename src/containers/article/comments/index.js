import React, {useCallback} from "react";
import Spinner from "../../../components/spinner";
import {shallowEqual, useSelector as useSelectorRedux, useStore as useStoreRedux} from "react-redux";
import LayoutComments from "../../../components/layout-comments";
import Comment from "../../../components/comment";
import ProtectedCommentForm from "../../protected-comment-form";
import actionsComments from "../../../services/store-redux/comments/actions";
import useInit from "../../../hooks/use-init";
import {useParams} from "react-router-dom";
import useTranslate from "../../../hooks/use-translate";

function Comments() {
    const storeRedux = useStoreRedux();
    const params = useParams();
    const {t, lang} = useTranslate();

    useInit(async () => {
        storeRedux.dispatch(actionsComments.load(params.id))
    }, [params.id, lang]);

    const select = useSelectorRedux(state => ({
        article: state.article.data._id,
        waiting: state.comments.waiting,
        comments: state.comments.items,
        total: state.comments.total,
        form: state.comments.form
    }), shallowEqual);

    const callbacks = {
        onAnswer: useCallback(_id =>
            storeRedux.dispatch(actionsComments.setForm({_id, _type: 'comment'})), [])
    }

    return <Spinner active={select.waiting}>
        <LayoutComments comments={select.comments} total={select.total} text={{head: t('comments.head')}}>
            {select.comments.map(comment => (
                <React.Fragment key={comment.data._id}>
                    <Comment text={{reply: t('comments.reply')}}
                             data={comment.data}
                             level={comment.level}
                             onAnswer={callbacks.onAnswer}
                    />
                    {select.form._id === comment.data._id && (
                        <ProtectedCommentForm level={comment.level} isAnswer={true}/>
                    )}
                </React.Fragment>
            ))}
            {select.form._id === select.article && (<ProtectedCommentForm level={0} isAnswer={false}/>)}
        </LayoutComments>
    </Spinner>
}

export default React.memo(Comments)
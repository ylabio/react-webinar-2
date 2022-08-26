import React, {useMemo, useState} from 'react';
import {useDispatch} from "react-redux";
import {load} from "../../store-redux/article-comments/action";
import useInit from "../../hooks/use-init";
import {useSelector as useSelectorRedux} from 'react-redux'
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import Comment from "../../components/comment";
import NewComment from "../new-comment";
import Spinner from "../../components/spinner";
import CommentsCount from "../../components/comments-count";

const CommentsArea = ({articleId}) => {
    const dispatch = useDispatch()


    const selectRedux = useSelectorRedux((state) => ({
        comments: state.articleComments.items,
        count: state.articleComments.count,
        waiting: state.articleComments.waiting,
    }));
    const [replyingOn, setReplyingOn] = useState(articleId)

    const userId = useSelector(state => state.session.user._id)

    const {t} = useTranslate();


    const loadAll =  () => {
       dispatch(load(articleId))
    }

    const getLocaleDate = (commentDate) => {
        let date = new Date(commentDate)
        return date.toLocaleString('re-RU',
            { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })
            .replace(",", " "+t('in')).replace(/\s*г\./, "");
    }

    useInit( async ()=> {
         loadAll()
    },[articleId])

    const options = {
        comments: useMemo(() => treeToList(listToTree(selectRedux.comments)) ,[selectRedux.comments])
    }

    const comments =
        options.comments && options.comments.map((comment) => {
            return <Comment key={comment._id}
                            text={comment.text}
                            replyTitle={t('comments.reply')}
                            author={comment.author.profile.name}
                            dateTime={getLocaleDate(comment.dateCreate)}
                            owner={userId && comment.author._id === userId}
                            indentLevel={comment.parent._tree?.length ?? 1}
                            replyCallback={() => setReplyingOn(comment._id)}
                            replyComponent={replyingOn === comment._id
                                && <NewComment
                                    isToArticle={false}
                                    onSubmit={() => setReplyingOn(articleId)}
                                    parent={comment._id}
                                    cancelCallback={() => setReplyingOn(articleId)}/>}
            />
        })
    return (
        <div>
            <Spinner active={selectRedux.waiting}>
                <CommentsCount title={t('comments.title')} count={selectRedux.count}/>
            {comments}
            {replyingOn === articleId ?<NewComment isToArticle={true} onSubmit={()=> setReplyingOn(articleId)} parent={articleId} cancelCallback={() => setReplyingOn(articleId)}/> : null }
            </Spinner>
        </div>
    );
};

export default CommentsArea;
import React, { useCallback, useMemo } from 'react'
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import {useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import actionsComments from '../../store-redux/comments/actions';
import Comments from "../../components/comments";
import useSelector from "../../hooks/use-selector";
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentsWrapper from '../../components/comments-wrapper';

function CommentsList(){
    // Параметры из пути /articles/:id
    const params = useParams();

    const storeRedux = useStoreRedux();

    useInit(async () => {
        storeRedux.dispatch(actionsComments.loadComments(params.id));
    }, [params.id]);

    const select = useSelectorRedux(state => ({
        comments: state.comments.comments,
        article: state.article.data,
    }), shallowEqual);

    const selectIsAuth = useSelector(state => ({
        exists: state.session.exists,
    }));

    const commentsArray = select.comments.comments;

    const callbacks = {
        openCommentForm: useCallback((evt) => {
            evt.preventDefault();
            const authMessages = document.querySelectorAll('.auth-message');
            const itemsForms = document.querySelectorAll('.Comments-item-form');
            const mainCommentsForm = document.querySelector('.Comments-wrapper-form');
            const parentActiveForm = evt.target.parentNode;
            const activeForm = parentActiveForm.querySelector('.Comments-item-form');
            const constMainCommentMessage = document.querySelector('.Comments-wrapper-main-text');
            const activeMessage = evt.target.parentNode.querySelector('.auth-message');
            if (!selectIsAuth.exists) {
                for (let i = 0; authMessages.length > i; i++) {
                    if (!authMessages[i].classList.contains('visually-hidden')) {
                        authMessages[i].classList.add('visually-hidden');
                    }
                    activeMessage.classList.remove('visually-hidden');
                    constMainCommentMessage.classList.add('visually-hidden');
                }
            }
            if (selectIsAuth.exists) {
                if (!mainCommentsForm.classList.contains('visually-hidden')) {
                    mainCommentsForm.classList.add('visually-hidden');
                }
                for (let i = 0; itemsForms.length > i; i++) {
                    if (!itemsForms[i].classList.contains('visually-hidden')) {
                        itemsForms[i].classList.add('visually-hidden');
                    }
                    activeForm.classList.remove('visually-hidden');
                }
            }

        }, [selectIsAuth.exists]),
        closeCommentForm: useCallback((evt)=> {
            const activeForm =  evt.target.parentNode.parentNode;
            const mainCommentsForm = document.querySelector('.Comments-wrapper-form');
            activeForm.classList.add('visually-hidden');
            mainCommentsForm.classList.remove('visually-hidden');
        }, []),
        resetMessage: useCallback((evt) => {
            const constMainCommentMessage = document.querySelector('.Comments-wrapper-main-text');
            evt.target.parentNode.classList.add('visually-hidden');
            constMainCommentMessage.classList.remove('visually-hidden');

        }, []),
        postComment: useCallback((comment) => {
            return storeRedux.dispatch(
                actionsComments.postComments({_id: params.id, ...comment})
            );
        }, [params.id])
    };

    const allComments = useMemo(() => {
        return treeToList(listToTree([{_id: select.article._id, parent: {}}, ...(commentsArray ?? [])]).find(({_id}) => {
            return _id === select.article._id
        }).children);
    }, [commentsArray])

    return (
            <CommentsWrapper
                id={select.article._id}
                isAuthorized={selectIsAuth.exists}
                commentsCount={allComments.length}
                onSubmit={callbacks.postComment}
            >
                <Comments
                    parentId={select.article._id}
                    comments={commentsArray}
                    isAuthorized={selectIsAuth.exists}
                    openCommentForm={callbacks.openCommentForm}
                    closeCommentForm={callbacks.closeCommentForm}
                    resetMessage={callbacks.resetMessage}
                    onSubmit={callbacks.postComment}
                />
            </CommentsWrapper>
    )
}

export default React.memo(CommentsList);

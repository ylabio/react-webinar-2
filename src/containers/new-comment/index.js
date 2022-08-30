import React, {useCallback, useState} from "react";
import useTranslate from "../../hooks/use-translate";
import {useLocation, useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import CommentAuthChecker from '../../components/comment-auth-checker';
import CommentNew from '../../components/comment-new';
import propTypes from 'prop-types';
import {useDispatch} from "react-redux";
import {post} from "../../store-redux/article-comments/action";


function NewComment(props) {

    const {t} = useTranslate();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    const select = useSelector(state => ({
        user: state.session.user,
        exists: state.session.exists
    }))
    const [text, setText] = useState("")
    const callbacks = {
        onSignIn: useCallback(() => {
            navigate('/login', {state: {back: location.pathname}});
        }, [location.pathname]),
    };
    const submitComment =  (e) => {
        if(text) {
            e.preventDefault()
            dispatch(post(text, props.parent, props.isToArticle ? "article" : "comment"));
            props.onSubmit()
            setText('')
        }
    }
    return (
        <>
            {select.exists ?
                <CommentNew
                            checkTo={props.isToArticle}
                            newCommentTitle={props.isToArticle ? t("comments.new.toArticle") : t("comments.new.toComment")}
                            value={text}
                            setValueCallback={setText}
                            submitTitle={t("comments.send")}
                            submitCallback={submitComment}
                            cancelCallback={props.isToArticle ? () => {} : props.cancelCallback}
                            cancelTitle={props.isToArticle ? "" : t('comments.new.cancel')}/> :
                <CommentAuthChecker
                                    checkTo={props.isToArticle}
                                    loginTitle={t('comments.goLogin')}
                                   cancelTitle={props.isToArticle ? "" : t("comments.new.cancel")}
                                   cancelCallback={props.isToArticle ? () => {} : props.cancelCallback}
                                   loginCallback={callbacks.onSignIn}
                                   procedureDescription={props.isToArticle ? t("comments.toLeaveNew") : t("comments.toReply")}/>}

        </>
    );
}

NewComment.propTypes = {
    parent: propTypes.string.isRequired,
    isToArticle: propTypes.bool.isRequired,
    cancelCallback: propTypes.func.isRequired,
    onSubmit: propTypes.func.isRequired
}

NewComment.defaultProps = {
    parent: "",
    isToArticle: true,
    cancelCallback: () => {}
}

export default React.memo(NewComment);
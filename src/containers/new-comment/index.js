import React, {useCallback, useState} from "react";
import useTranslate from "../../hooks/use-translate";
import {useStore as useStoreRedux} from "react-redux";
import actionsComments from '../../store-redux/article-comments/actions'
import {useLocation, useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import CommentRestrictor from '../../components/comment-restrictor';
import CommentNew from '../../components/comment-new';
import propTypes from 'prop-types';


function NewCommentContainer(props) {

  const {t} = useTranslate();
  const storeRedux = useStoreRedux();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists
  }))
  const [text, setText] = useState("")
  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  };
  const submitComment = (e) => {
    e.preventDefault()
    if(text) {
      storeRedux.dispatch(actionsComments.post(text, props.parent, props.isToArticle ? "article" : "comment"));
      props.onSubmit()
    }
  }
  return (
    <>
      {select.exists ?
      <CommentNew newCommentTitle={props.isToArticle ? t("comments.new.toArticle") : t("comments.new.toComment")}
                  value={text}
                  setValueCallback={setText}
                  submitTitle={t("comments.send")}
                  submitCallback={submitComment}
                  cancelCallback={props.isToArticle ? () => {} : props.cancelCallback}
                  cancelTitle={props.isToArticle ? "" : t('comments.new.cancel')}/> :
        <CommentRestrictor loginTitle={t('comments.goLogin')}
                           cancelTitle={props.isToArticle ? "" : t("comments.new.cancel")}
                           cancelCallback={props.isToArticle ? () => {} : props.cancelCallback}
                           loginCallback={callbacks.onSignIn}
                           procedureDescription={props.isToArticle ? t("comments.toLeaveNew") : t("comments.toReply")}/>}

    </>
  );
}

NewCommentContainer.propTypes = {
  parent: propTypes.string.isRequired,
  isToArticle: propTypes.bool.isRequired,
  cancelCallback: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired
}

NewCommentContainer.defaultProps = {
  parent: "",
  isToArticle: true,
  cancelCallback: () => {}
}

export default React.memo(NewCommentContainer);

import React, {useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import CommentForm from "../../components/comment-form";
import {shallowEqual, useSelector as useSelectorRedux, useStore as useStoreRedux} from "react-redux";
import actionsComments from "../../store-redux/comments/actions";
import Spinner from "../../components/spinner";
import propTypes from "prop-types";
import CommentRedirect from "../../components/comment-redirect";

function UserComment({parentId, parentType}){
  const {t} = useTranslate();
  const storeRedux = useStoreRedux();

  const select = useSelector(state => ({
    exists: state.session.exists
  }));

  const selectRedux = useSelectorRedux(state => ({
    replyOpenStatus:  state.comments.replyOpenStatus,
    sendWaiting:  state.comments.sendWaiting,
    error:  state.comments.error,
  }), shallowEqual);

  const callbacks = {
    onCancelClick: useCallback(() => {
      storeRedux.dispatch(actionsComments.replyOpen(null));
    }, [select.replyOpenStatus]),
    onSendClick: useCallback((text) => {
      storeRedux.dispatch(actionsComments.sendComment(text, parentId, parentType));
    }, []),
    resetError: useCallback(() => {
      storeRedux.dispatch(actionsComments.resetError());
    }, []),
  };

  return (
  <Spinner active={selectRedux.sendWaiting}>
      {select.exists
        ? <CommentForm title={selectRedux.replyOpenStatus ? t('comment.subtitle') : t('comment.title')}
                       sendText={t('comment.send')}
                       cancelText={t('comment.cancel')}
                       errorText={t('comment.error')}
                       isDefault={!!selectRedux.replyOpenStatus}
                       onCancelClick={callbacks.onCancelClick}
                       onSendClick={callbacks.onSendClick}
                       error={selectRedux.error}
                       resetError={callbacks.resetError}/>
        : <CommentRedirect mainText={t('redirect.mainText')}
                           linkText={t('redirect.linkText')}
                           link={"/login"}
                           isDefault={!!selectRedux.replyOpenStatus}
                           cancelText={t('comment.cancel')}
                           onCancel={callbacks.onCancelClick}/>
      }
    </Spinner>
  )
}

UserComment.propTypes = {
  parentId: propTypes.string.isRequired,
  parentType: propTypes.string.isRequired,
  isDefault: propTypes.bool.isRequired,
}

export default React.memo(UserComment);

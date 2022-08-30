import React, { useCallback } from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import CommentForm from '../../components/comment-form';
import {
  shallowEqual,
  useSelector as useSelectorRedux,
  useStore as useStoreRedux,
} from 'react-redux';
import actionsComments from '../../store-redux/comments/actions';
import propTypes from 'prop-types';
import CommentRedirect from '../../components/comment-redirect';
import { useLocation, useNavigate } from 'react-router-dom';

function CheckAuthComment({ parentId, parentType }) {
  const { t } = useTranslate();
  const storeRedux = useStoreRedux();

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const selectRedux = useSelectorRedux(
    state => ({
      replyStatus: state.comments.replyStatus,
      sendWaiting: state.comments.sendWaiting,
    }),
    shallowEqual
  );
  const navigate = useNavigate();
  const location = useLocation();

  const callbacks = {
    onCancelClick: useCallback(() => {
      storeRedux.dispatch(actionsComments.showReply(null));
    }, [select.replyStatus]),
    onSendClick: useCallback(text => {
      storeRedux.dispatch(actionsComments.post(text, parentId, parentType));
    }, []),
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  return (
    <>
      {select.exists ? (
        <CommentForm
          title={
            selectRedux.replyStatus ? t('comment.subtitle') : t('comment.title')
          }
          sendText={t('comment.send')}
          cancelText={t('comment.cancel')}
          isDefault={!!selectRedux.replyStatus}
          onCancelClick={callbacks.onCancelClick}
          onSendClick={callbacks.onSendClick}
        />
      ) : (
        <CommentRedirect
          mainText={
            selectRedux.replyStatus
              ? t('redirect.articleReply')
              : t('redirect.commentReply')
          }
          linkText={t('redirect.linkText')}
          isDefault={!!selectRedux.replyStatus}
          cancelText={t('comment.cancel')}
          onCancel={callbacks.onCancelClick}
          onSignIn={callbacks.onSignIn}
        />
      )}
    </>
  );
}

CheckAuthComment.propTypes = {
  parentId: propTypes.string.isRequired,
  parentType: propTypes.string.isRequired,
  isDefault: propTypes.bool.isRequired,
};

export default React.memo(CheckAuthComment);

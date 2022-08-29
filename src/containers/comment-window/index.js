import React, { useCallback } from 'react';
import useSelector from '../../hooks/use-selector';
import {
  shallowEqual,
  useSelector as useSelectorRedux,
  useStore as useStoreRedux,
} from 'react-redux';
import actionsComment from '../../store-redux/comments/actions';
import Spinner from '../../components/spinner';
import propTypes from 'prop-types';
import FormComment from '../../components/comments/form-comment';
import ProtectedComment from '../../components/comments/protected-comment';

function WindowComment({ parentId, parentType }) {
  const storeRedux = useStoreRedux();

  const select = useSelector((state) => ({
    exists: state.session.exists,
  }));

  const selectRedux = useSelectorRedux(
    (state) => ({
      isReplying: state.comments.isReplying,
      sendWaiting: state.comments.sendWaiting,
    }),
    shallowEqual
  );

  const callbacks = {
    onSend: useCallback((text) => {
      storeRedux.dispatch(actionsComment.send(text, parentId, parentType));
    }, []),
    onCancel: useCallback(() => {
      storeRedux.dispatch(actionsComment.reply(''));
    }, [selectRedux.isReplying]),
  };

  return (
    <Spinner active={selectRedux.sendWaiting}>
      {select.exists ? (
        <FormComment
          newReply={selectRedux.isReplying}
          onCancel={callbacks.onCancel}
          onSend={callbacks.onSend}
        />
      ) : (
        <ProtectedComment
          newReply={selectRedux.isReplying}
          redirect={'/login'}
          onCancel={callbacks.onCancel}
        />
      )}
    </Spinner>
  );
}

WindowComment.propTypes = {
  parentId: propTypes.string.isRequired,
  parentType: propTypes.string.isRequired,
};

export default React.memo(WindowComment);

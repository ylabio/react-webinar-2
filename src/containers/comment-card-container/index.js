import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {useSelector as useSelectorRedux} from 'react-redux';
import CommentCard from '../../components/comment-card';
import Spinner from '../../components/spinner';
import ReplyComment from '../reply-comment';
import OutsideAlerter from '../../hooks/use-outside-alterter';
import {useDispatch} from 'react-redux';
import {
  formHide,
  formShow,
  isFormVisible
} from '../../store-redux/comments-slice';
import ProtectedCommentForm from '../protected-comment-form';
import useSelector from '../../hooks/use-selector';
import {selectUserById} from '../../store-redux/users-slice';

function CommentCardContainer(props) {
  const dispatch = useDispatch();
  const author = useSelectorRedux(state =>
    selectUserById(state, props.comment.author._id)
  );
  const isMainFormVisible = useSelectorRedux(isFormVisible);

  const [isVisible, setIsVisible] = useState(false);

  const selectStore = useSelector(state => ({
    exists: state.session.exists
  }));

  const callbacks = {
    // действия для оповещения при клике вне текущего коммента
    onOutsideAlerter: useCallback(
      (isOutside, target) => {
        if (isOutside) {
          // закрываем форму текущего комментария
          if (target.name === 'reply') {
            setIsVisible(false);
          }
        }
      },
      [dispatch]
    ),

    onReply: useCallback(() => {
      setIsVisible(true);
      dispatch(formHide());
    }, [dispatch])
  };

  // показывать комментарий, только при загрузке автора
  return (
    <OutsideAlerter callback={callbacks.onOutsideAlerter}>
      <Spinner active={!author}>
        <CommentCard
          content={props.comment.text}
          author={author?.name}
          date={props.comment.dateCreate}
          onReply={callbacks.onReply}
        />

        {isVisible ? (
          <ProtectedCommentForm
            callbackGuardCondition={() => selectStore.exists}
          >
            <ReplyComment
              parentId={props.comment._id}
              onCancel={() => {
                setIsVisible(false), dispatch(formShow());
              }}
            />
          </ProtectedCommentForm>
        ) : null}
      </Spinner>
    </OutsideAlerter>
  );
}

CommentCardContainer.propTypes = {
  comment: propTypes.object
};

export default React.memo(CommentCardContainer);

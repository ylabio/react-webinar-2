import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import CommentCard from '../../components/comment-card';
import useInit from '../../hooks/use-init';
import Spinner from '../../components/spinner';
import ReplyComment from '../reply-comment';
import OutsideAlerter from '../../hooks/use-outside-alterter';
import {useDispatch} from 'react-redux';
import {formHide, formShow} from '../../store-redux/comments-slice';
import ProtectedCommentForm from '../protected-comment-form';
import useSelector from '../../hooks/use-selector';

function CommentCardContainer(props) {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [author, setAuthor] = useState('');

  useInit(async () => {
    /* раньше делал запрос для каждого компонента комментария на получение имени автора,
        теперь получаю из слайса уже промисы в поле автора, и ожидаю их исполнения здесь.
    */

    // const response = await services.api.request({
    //   url: `/api/v1/users/${authorId}?fields=profile`
    // });
    // const authorName = response?.result?.profile.name;

    const response = await props.comment.authorName;
    const authorName = response?.result?.profile.name;

    setAuthor(authorName);
  });

  const selectStore = useSelector(state => ({
    exists: state.session.exists
  }));

  const callbacks = {
    onFormToggle: useCallback(
      bool => {
        setIsVisible(bool);
      },
      [setIsVisible]
    ),
    // действия для оповещения при клике вне текущего коммента
    onOutsideAlerter: useCallback(
      target => {
        if (target.name === 'reply') {
          // если нажата кнопка 'ответить' другого комментария-ответа, то форма нового комментария должна быть закрыта
          dispatch(formHide());
        } else {
          // если нажатие просто снаружи комментариев-ответов, то форма нового комментария открывается
          dispatch(formShow());
        }
        // закрываем форму текущего комментария
        setIsVisible(false);
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
    <>
      {author && (
        <OutsideAlerter callback={callbacks.onOutsideAlerter}>
          <Spinner active={!author}>
            <CommentCard
              content={props.comment.text}
              author={author}
              date={props.comment.dateCreate}
              onReply={callbacks.onReply}
            />

            {isVisible ? (
              <ProtectedCommentForm
                callbackGuardCondition={() => selectStore.exists}
              >
                <ReplyComment
                  parentId={props.comment._id}
                  onCancel={() => callbacks.onFormToggle(false)}
                />
              </ProtectedCommentForm>
            ) : null}
          </Spinner>
        </OutsideAlerter>
      )}
    </>
  );
}

CommentCardContainer.propTypes = {
  comment: propTypes.object
};

export default React.memo(CommentCardContainer);

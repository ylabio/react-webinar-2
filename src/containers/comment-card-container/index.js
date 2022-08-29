import React, {useCallback, useEffect, useState} from 'react';
import propTypes from 'prop-types';
import CommentCard from '../../components/comment-card';
import useInit from '../../hooks/use-init';
import useServices from '../../hooks/use-services';
import Spinner from '../../components/spinner';
import ReplyComment from '../reply-comment';
import OutsideAlerter from '../../hooks/use-outside-alterter';
import {useDispatch} from 'react-redux';
import {formHide, formShow} from '../../store-redux/comments-slice';

function CommentCardContainer(props) {
  const services = useServices();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [author, setAuthor] = useState('');
  const authorId = props.comment.author._id;

  useInit(async () => {
    const response = await services.api.request({
      url: `/api/v1/users/${authorId}`
    });
    const authorName = response?.result?.username;
    setAuthor(authorName);
  }, [props.comment.author._id]);

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

  return (
    <OutsideAlerter callback={callbacks.onOutsideAlerter}>
      <Spinner active={!author}>
        <CommentCard
          content={props.comment.text}
          author={author}
          date={props.comment.dateCreate}
          onReply={callbacks.onReply}
        />
        {isVisible ? (
          <ReplyComment
            parentId={props.comment._id}
            onCancel={() => callbacks.onFormToggle(false)}
          />
        ) : null}
      </Spinner>
    </OutsideAlerter>
  );
}

CommentCardContainer.propTypes = {
  comment: propTypes.object
};

export default React.memo(CommentCardContainer);

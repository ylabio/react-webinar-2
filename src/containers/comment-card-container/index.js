import React, {useCallback, useEffect, useState} from 'react';
import propTypes from 'prop-types';
import CommentCard from '../../components/comment-card';
import useInit from '../../hooks/use-init';
import useServices from '../../hooks/use-services';
import Spinner from '../../components/spinner';
import ReplyComment from '../reply-comment';
import OutsideAlerter from '../../hooks/use-outside-alterter';

function CommentCardContainer(props) {
  const services = useServices();
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
    )
  };

  return (
    <OutsideAlerter callback={() => callbacks.onFormToggle(false)}>
      <Spinner active={!author}>
        <CommentCard
          content={props.comment.text}
          author={author}
          date={props.comment.dateCreate}
          onReply={callbacks.onFormToggle}
        />
        {isVisible ? (
          <ReplyComment
            parentId={props.comment._id}
            onCancel={callbacks.onFormToggle}
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

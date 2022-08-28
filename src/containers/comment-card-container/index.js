import React, {useEffect, useState} from 'react';
import propTypes from 'prop-types';
import CommentCard from '../../components/comment-card';
import useInit from '../../hooks/use-init';
import useServices from '../../hooks/use-services';
import Spinner from '../../components/spinner';

function CommentCardContainer(props) {
  const services = useServices();
  const [author, setAuthor] = useState('');
  const authorId = props.comment.author._id;

  useInit(async () => {
    const response = await services.api.request({
      url: `/api/v1/users/${authorId}`
    });
    const authorName = response?.result?.username;
    setAuthor(authorName);
  }, [props.comment.author._id]);

  return (
    <Spinner active={!author}>
      <CommentCard
        content={props.comment.text}
        author={author}
        date={props.comment.dateCreate}
        onReply={() => {}}
      />
    </Spinner>
  );
}

CommentCardContainer.propTypes = {
  comment: propTypes.object
};

export default React.memo(CommentCardContainer);

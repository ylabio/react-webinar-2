import React, {useMemo, useState} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useSelectorHook from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import actionsComments from '../../store-redux/article-comments/actions'
import propTypes from 'prop-types';
import Comment from '../../components/comment';
import CommentsTitle from '../../components/comments-title';
import NewCommentContainer from '../new-comment';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentBlock from "../../components/comment-block";
import formatDate from "../../utils/formatDate";

function ArticleComments({id}){

  const [reply, setReply] = useState(id);

  const storeRedux = useStoreRedux();
  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(id));
  }, [id]);

  const userId = useSelectorHook((state) => state.session.user._id);

  const selectRedux = useSelectorRedux((state) => ({
    comments: state.articleComments.items,
    count: state.articleComments.count,
    waiting: state.articleComments.waiting
  }), shallowEqual);

  const callbacks = {
    comments: useMemo(() => treeToList(listToTree(selectRedux.comments)),[selectRedux.comments])
  }
  const comments =
    callbacks.comments &&
    callbacks.comments.map((comment) => {
      return (
        <Comment
          key={comment._id}
          text={comment.text}
          title="Ответить"
          userName={comment.author.profile.name}
          date={formatDate(comment.dateCreate)}
          me={userId && comment.author._id === userId}
          level={comment.parent._tree?.length ?? 1}
          onReply={() => setReply(comment._id)}
          replyComponent={
            reply === comment._id && (
              <NewCommentContainer
                isNewComment={false}
                onSubmit={() => setReply(id)}
                parent={comment._id}
                onCancel={() => setReply(id)}
              />
            )
          }
        />
      );
    });
  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsTitle title="Комментарии" count={selectRedux.count} />
      {comments}
      <CommentBlock
        comment={
          <NewCommentContainer
            isNewComment={true}
            parent={id}
            onSubmit={() => setReply(id)}
          />
        }
      />
    </Spinner>
  );
}

ArticleComments.propTypes = {
  id: propTypes.string.isRequired
}

export default React.memo(ArticleComments);

import React, {useState, useMemo} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import actionsComments from '../../store-redux/comments/actions';
import propTypes from "prop-types";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import ArticleBottom from "../../components/article-coments";
import CommentsTitle from "../../components/comments-title";
import Comment from "../../components/comment";
import NewComment from "../new-comment";
import moment from "moment";

function ArticleComments({article_id}) {
  const storeRedux = useStoreRedux();
  moment.locale('ru');

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(article_id))
  }, [article_id]);

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data,
    count: state.comments.count,
    waiting: state.comments.waiting
  }), shallowEqual);

  const [activeComment, setActiveComment] = useState(article_id);

  const options = {
    comments: useMemo(() => treeToList(listToTree(selectRedux.comments)), [selectRedux.comments])
  }

  const comments = options.comments && options.comments.map((comment) => {
    return <Comment
      key={comment._id}
      comment_id={comment._id}
      userName={comment.author.profile.name}
      date={moment(comment.dateCreate).format('DD MMMM YYYY в h:mm')}
      text={comment.text}
      depthLevel={(comment.parent._tree?.length < 7) ? (comment.parent._tree?.length - 1) : 5}
      activeComment={activeComment}
      setActiveComment={() => setActiveComment(comment._id)}
      replyComponent={<NewComment 
        parent_id={comment._id}
        parent_type={'comment'}
        hasCancelButton={true}
        handleCancel={() => {setActiveComment(article_id)}}
        titleLabel={'ответ'}
        stubLabel={'ответить.'}
        />
      }
    />
  });

  return (
    <Spinner active={selectRedux.waiting}>
      <ArticleBottom>
        <CommentsTitle count={selectRedux.count}/>
        {comments}
        {activeComment === article_id && 
        <NewComment 
          parent_id={article_id}
          parent_type={'article'}
          hasCancelButton={false}
          handleCancel={() => {setActiveComment(article_id)}}
          titleLabel={'комментарий'}
          stubLabel={'комментировать'}
        />}
      </ArticleBottom>
    </Spinner>
  );
}

ArticleComments.propTypes = {
  article_id: propTypes.string.isRequired
}

export default React.memo(ArticleComments);

import React, {useMemo, useState} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import actionsComments from '../../store-redux/article-comments/actions'
import propTypes from 'prop-types';
import Comment from '../../components/comment';
import CommentsTitle from '../../components/comments-title';
import NewCommentContainer from '../new-comment';
import BaseComment from '../../components/base-comment';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

function ArticleComments(props){
  const storeRedux = useStoreRedux();
  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(props.article_id))
  }, [props.article_id]);

  const [replyingOn, setReplyingOn] = useState(props.article_id)

  const userId = useSelector(state => state.session.user._id)

  const selectRedux = useSelectorRedux((state) => ({
    comments: state.articleComments.items,
    count: state.articleComments.count,
    waiting: state.articleComments.waiting
  }), shallowEqual);

  const {t} = useTranslate();

  const getLocaleString = (commentDate) => {
    let date = new Date(commentDate)
    return date.toLocaleString(undefined,
      { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })
      .replace(",", " "+t('in')) // господь простит меня за этот мув
  }
  const options = {
    comments: useMemo(() => treeToList(listToTree(selectRedux.comments)),[selectRedux.comments])
  }
  const comments =
    options.comments && options.comments.map((comment) => {
      return <Comment key={comment._id} text={comment.text} replyTitle={t('comments.reply')}
                      author={comment.author.profile.name} dateTime={getLocaleString(comment.dateCreate)}
                      owner={userId && comment.author._id === userId} indentLevel={comment.parent._tree?.length ?? 1}
                      replyCallback={() => setReplyingOn(comment._id)}
                      replyComponent={replyingOn === comment._id
                        && <NewCommentContainer
                          isToArticle={false}
                          onSubmit={() => setReplyingOn(props.article_id)}
                          parent={comment._id}
                          cancelCallback={() => setReplyingOn(props.article_id)}/>}/>
    })
  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsTitle title={t('comments.title')} count={selectRedux.count}/>
      {comments}
      {replyingOn === props.article_id && <BaseComment comment={<NewCommentContainer
        isToArticle={true} parent={props.article_id} onSubmit={() => setReplyingOn(props.article_id)}/>}/>}
    </Spinner>
  )
}

ArticleComments.propTypes = {
  article_id: propTypes.string.isRequired
}

export default React.memo(ArticleComments);

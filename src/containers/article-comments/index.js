import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import Comment from '../../components/comment';
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import actionsComments from '../../store-redux/comments/actions';
import useInit from '../../hooks/use-init';
import {useParams} from "react-router-dom";
import listToTree from '../../utils/list-to-tree';
import CommentContainer from '../comment-container';
import NewComment from '../../components/new-comment';

function ArticleComments() {
  const params = useParams();

  const cn = bem('ArticleComments');

  const storeRedux = useStoreRedux();

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    commentId: state.comments.commentId,
  }), shallowEqual);

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(params.id));
  }, []);

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Комментарии {`(${select.comments.length})`}</h2>
      {
        listToTree(select.comments, params.id).map((comment) =>
          <div className='Comment-container' key={comment._id}>
            <Comment comment={comment}/>
            <CommentContainer comments={comment.children} margin={30}/>
          </div>
        )
      }
      {!select.commentId && <NewComment title={'Новый комментарий'} />}
    </div>
  )
}

ArticleComments.propTypes = {
  //article: propTypes.object.isRequired,
  //onAdd: propTypes.func
}

ArticleComments.defaultProps = {
  //article: {},
  //onAdd: () => {}
}

export default React.memo(ArticleComments);

import React, { useCallback } from 'react';
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
import Spinner from '../../components/spinner';
import useSelector from '../../hooks/use-selector';
import UnloginText from '../../components/unlogin-text';
import { useNavigate, useLocation } from "react-router-dom";

function ArticleComments() {
  const cn = bem('ArticleComments');

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const storeRedux = useStoreRedux();

  const exists = useSelector(state => state.session.exists);

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    commentId: state.comments.commentId,
    waiting: state.comments.waiting,
  }), shallowEqual);

  const callbacks = {
    load: useCallback(() => storeRedux.dispatch(actionsComments.load(params.id)), []),

    onSend: useCallback((data) => {
      storeRedux.dispatch(actionsComments.send(data, params.id, 'article'));
      callbacks.load();
    }, []),

    redirect: useCallback(() => {
      navigate('/login', {state: { back: location.pathname }});
    })
  }

  useInit(async () => {
    callbacks.load();
  }, []);

  return (
    <Spinner active={select.waiting}>
      <div className={cn()}>
        <h2 className={cn('title')}>Комментарии {`(${select.comments.length})`}</h2>
        {
          listToTree(select.comments, params.id).map((comment) =>
            <div className='Comment-container' key={comment._id}>
              <Comment comment={comment} articleId={'qwerty'} />
              <CommentContainer comments={comment.children} margin={30}/>
            </div>
          )
        }
        {
          exists ? 
            !select.commentId && <NewComment title={'Новый комментарий'} send={callbacks.onSend} />
              :
            !select.commentId && <UnloginText text={'комментировать'} redirect={callbacks.redirect}/>
        }
      </div>
    </Spinner>
  )
}

ArticleComments.propTypes = {

}

export default React.memo(ArticleComments);

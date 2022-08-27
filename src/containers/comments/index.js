import React from 'react';
import useInit from '../../hooks/use-init';
import { useParams } from 'react-router-dom';
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from 'react-redux';
import actionsComments from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentForm from '../../components/comment-form';
import Comment from '../../components/comment';
import useSelector from '../../hooks/use-selector';
import LayoutComments from '../../components/layout-comments';
import ProtectedComment from '../protected-comment';

function Comments() {
  const params = useParams();
  const storeRedux = useStoreRedux();
  const [vis, setVis] = React.useState(true);

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      comments: state.comments.data,
    }),
    shallowEqual
  );

  // userName нужен, если загружаем новый комментарий без запроса
  const userName = useSelector(
    (state) => ({ ...state.session.user.profile }.name)
  );

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(params.id));
  }, []);

  console.log('comments', select.comments);

  const callbacks = {
    addPost: React.useCallback((data, userName, id, comId) => {
      storeRedux.dispatch(actionsComments.post(data, userName, id, comId));
    }, []),
    show: React.useCallback((id) => {
      storeRedux.dispatch(actionsComments.show(id));
      setVis(false);
    }, []),
    hide: React.useCallback(() => {
      storeRedux.dispatch(actionsComments.hide());
      setVis(true);
    }, []),
  };

  const options = {
    comments: React.useMemo(
      () =>
        select.comments.length &&
        treeToList(
          listToTree(select.comments, undefined, select.article._id),
          (item, level) => ({
            id: item._id,
            text: item.text,
            author: item.author.profile.name,
            padding: 30 * level,
            date: item.dateCreate,
            active: item.active,
          })
        ),
      [select.comments]
    ),
  };

  return (
    <LayoutComments>
      <h3>Комментарии {`(${select.comments.length || 0})`}</h3>
      {options.comments?.length &&
        options.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} show={callbacks.show}>
            <CommentForm
              id={comment.id}
              addPost={callbacks.addPost}
              type="comment"
              userName={userName}
              active={comment.active}
              lable="Новый ответ"
            >
              <span onClick={callbacks.hide}>Отмена</span>
            </CommentForm>
          </Comment>
        ))}

      <CommentForm
        id={select.article._id}
        addPost={callbacks.addPost}
        type="article"
        userName={userName}
        active={vis}
        lable="Новый комментарий"
      />
    </LayoutComments>
  );
}

export default React.memo(Comments);

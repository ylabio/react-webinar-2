import propTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommentItem from '../../components/comment/item';
import CommentList from '../../components/comment/list';
import CommentWritter from '../../components/comment/writter';
import Spinner from "../../components/spinner";
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

/**
 * Компонент для комментариев
 * @prop comments - пачка комментов откудато извне
 * @prop onSend - послать новый коммент/ответ
 */

function Comments({ id, comments, onSend, waiting }) {

  const navigate = useNavigate();
  const location = useLocation();
  const { exists, user } = useSelector(state => state.session);
  const { t } = useTranslate();

  //console.log('comments:', comments);

  const prefab = { id, parentId: null, text: 'Текст' };
  const [newComment, setNewComment] = useState({ ...prefab });
  const list = useMemo(() => treeToList(listToTree([
    ...comments,
    {
      _type: 'writter',
      _id: '-1',
      text: newComment.text,
      parent: { _id: newComment.parentId || newComment.id }
    }
  ], id), (item, shift) => ({ ...item, shift })), [comments, newComment]);

  //console.log('list:', list);

  const callbacks = {
    onReply: useCallback(
      (parentId, name) => setNewComment(() => ({ ...prefab, parentId, text: 'Мой ответ для ' + name })), []),
    onCancel: useCallback(
      () => setNewComment({ ...prefab })
      , [setNewComment, prefab]),
    onSubmit: useCallback(() => {
      onSend({ ...newComment });
      setNewComment(comment => ({ ...comment, text: '' }));
    }, [newComment, setNewComment]),
    onChange: useCallback(
      text => setNewComment(comment => ({ ...comment, text })), [setNewComment]
    ),
    onSignin: useCallback(() => navigate('/login', { state: { back: location.pathname } }), [navigate])
  };



  const renders = {
    comment: useCallback(comment => (
      <CommentItem
        key={comment._id}
        shift={comment.shift}
        id={comment._id}
        text={comment.text}
        date={comment.dateCreate}
        user={{ name: comment.author?.profile?.name, _id: comment.author?._id }}
        onReply={callbacks.onReply}
        mine={user?._id === comment.author?._id} // узнать свои комменты
        t={t}
      />
    ), [t, user, newComment]),
    writter: useCallback(writter => (
      <CommentWritter
        key={writter._id}
        isAuth={exists}
        isReply={newComment.parentId ? true : false}
        text={writter.text}
        onChange={callbacks.onChange}
        onSubmit={callbacks.onSubmit}
        onCancel={callbacks.onCancel}
        onSignin={callbacks.onSignin}
        shift={writter.shift}
        t={t}
      />
    ), [t, user, newComment])
  };

  return (
    <Spinner active={waiting}>
      <CommentList list={list} comment={renders.comment} writter={renders.writter} t={t} />
    </Spinner>
  );
}

Comments.propTypes = {
  id: propTypes.string.isRequired,
  comments: propTypes.array.isRequired,
  onSend: propTypes.func,
  waiting: propTypes.bool
}

Comments.defaultProps = {
  onSend: () => { },
  waiting: false
}

export default React.memo(Comments);
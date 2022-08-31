import propTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommentItem from '../../components/comment/item';
import CommentList from '../../components/comment/list';
import CommentWritter from '../../components/comment/writter';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

/**
 * Компонент для комментариев
 * @prop id - ид итема, к которому привязываемся
 * @prop comments - пачка комментов откудато извне
 * @prop onSend - послать новый коммент/ответ
 */

function Comments({ id, comments, onSend }) {

  const navigate = useNavigate();
  const location = useLocation();
  const { exists, user } = useSelector(state => state.session);
  const { t } = useTranslate();
  const ref = useRef(null);

  //console.log('comments:', comments);

  const prefab = { id, parentId: null, text: 'Текст' };
  const [newComment, setNewComment] = useState({ ...prefab });
  const list = useMemo(() => treeToList(listToTree([
    ...comments,
    {
      _type: 'writter',
      _id: null,
      text: newComment.text,
      parent: { _id: newComment.parentId || newComment.id }
    }
  ], id), (item, shift) => ({ ...item, shift })), [comments, newComment]);

  //console.log('list:', list);

  const callbacks = {
    onReply: useCallback(
      (parentId, name) => setNewComment(() => ({ ...prefab, parentId, text: 'Мой ответ для ' + name })), []),
    onCancel: useCallback(
      () => setNewComment(prefab), [prefab]),
    onSubmit: useCallback(() => {
      onSend(newComment);
      setNewComment(comment => ({ ...comment, text: '' }));
    }, [newComment]),
    onChange: useCallback(
      text => setNewComment(comment => ({ ...comment, text })), []
    ),
    onSignin: useCallback(() => navigate('/login', { state: { back: location.pathname } }), [navigate])
  };

  useEffect(() => {
    //console.log(ref);
    if (!newComment.parentId) // не скроллим за "новым комментом"
      return;
    //const nodeOffset = parseInt(document.getElementsByClassName('CommentEditor')[0]?.offsetTop);
    const nodeOffset = ref.current?.offsetTop;
    const innerHeight = window.innerHeight;
    window.scrollTo({ top: nodeOffset - innerHeight / 2, behavior: "smooth" });
  }, [newComment]);

  const renders = {

    // коммент
    comment: useCallback(comment => (
      <CommentItem
        key={comment._id}
        id={comment._id}
        user={{ name: comment.author?.profile?.name, _id: comment.author?._id }}
        mine={user?._id == comment.author?._id} // узнать свои комменты
        date={comment.dateCreate}
        text={comment.text}
        onReply={callbacks.onReply}
        shift={comment.shift <= 10 ? comment.shift : 10}
        t={t}
      />
    ), [t, user, newComment]),

    // форма для ввода
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
        shift={writter.shift <= 10 ? writter.shift : 10}
        r={ref}
        t={t}
      />
    ), [t, user, newComment])
  };

  return (
    <CommentList list={list} comment={renders.comment} writter={renders.writter} t={t} />
  );
}

Comments.propTypes = {
  id: propTypes.string.isRequired,
  comments: propTypes.array.isRequired,
  onSend: propTypes.func
}

Comments.defaultProps = {
  onSend: () => { }
}

export default React.memo(Comments);
import React, {useCallback, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import actionsComments from '../../store-redux/comments/actions';
import CommentsList from "../../components/comments-list";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import Comment from "../../components/comment";
import CommentForm from "../../components/comment-form";
import LoginWarning from "../../components/login-warning";
import PrivateComponent from "../private-component";

function Comments() {
  const storeRedux = useStoreRedux()
  const location = useLocation()
  const MAX_INDENT = 600
  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    count: state.comments.count,
    waiting: state.comments.waiting,
    articleId: state.article.data._id,
    articleType: state.article.data._type,
  }), shallowEqual);

  const {t} = useTranslate()

  // Храним id комментария/продукта, на который собираемся ответить
  const [replyId, setReplyId] = useState(null)

  const callbacks = {
    // Нажатие кнопки ответить -> показываем форму к коментарию
    onReply: useCallback((_id) => {setReplyId(_id)}, []),
    // Отмена комментария -> скрываем форму
    onCancel: useCallback((_id) => {setReplyId(null)}, []),
    // Добавление комментария/ответа, если ID не передан, то по умолчанию берем ID товара
    onAdd: useCallback((text, type, parentId) => {
      storeRedux.dispatch(actionsComments.create({text, type, parentId}))
        // Закрываем форму
        .then(() => setReplyId(null))
    }, [])
  }

  // Форматированный список комментариев с добавлением поля indent для указания размера отступов согласно иерархии
  const comments = useMemo(() => (
    treeToList(
      listToTree(select.comments, select.articleType),
      (item, level) => ({_id: item._id, author: item.author.profile.name, dateCreate: item.dateCreate, text: item.text, indent: level*30})
    )
  ), [select.comments])

  const renders = { 
    // рендер комментария
    item: useCallback((item) => (<Comment item={item} onReply={callbacks.onReply}/>), []),
    // рендер формы для комментария/ответа
    form: useCallback((t, type, parentId) => (
      <PrivateComponent warning={<LoginWarning type={type} onCancel={callbacks.onCancel} pathname={location.pathname} t={t}/>}>
        <CommentForm  parentId={parentId}
                      commentType={type}
                      onCancel={callbacks.onCancel} 
                      onAdd={callbacks.onAdd} 
                      t={t}
        />
      </PrivateComponent>
    ), [])
  }

  return (
    <Spinner active={select.waiting}>
      <CommentsList articleId={select.articleId}
                    comments={comments} 
                    count={select.count} 
                    renderComment={renders.item} 
                    renderForm={renders.form} 
                    replyId={replyId}
                    MAX_INDENT={MAX_INDENT}
                    t={t}
      />
    </Spinner>
  )
}

export default React.memo(Comments)
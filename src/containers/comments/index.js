import React, {useCallback, useMemo, useState} from 'react';
import {cn as bem} from '@bem-react/classname'
import ItemComment from "../../components/item-comment";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import {shallowEqual, useSelector as useSelectorRedux, useStore as useStoreRedux} from "react-redux";
import useSelector from "../../hooks/use-selector";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import actionsComments from "../../store-redux/comments/actions";
import CommentsList from "../../components/comments-list";
import useTranslate from "../../hooks/use-translate";

function Comments() {
  const storeRedux = useStoreRedux();
  
  const navigate = useNavigate()
  
  const location = useLocation();
  
  const {t} = useTranslate();
  
  // CSS классы по БЭМ
  const cn = bem('Comments');
  
  const params = useParams()
  
  // Место, куда будет добавлен новый комментарий (для товара или вложен в другой комментарий)
  const [currentAnswer, setCurrentAnswer] = useState(params.id);
  const [currentAnswerType, setCurrentAnswerType] = useState('article');
  
  const select = useSelectorRedux(state => ({
    commentsCount: state.comments.count,
    comments: state.comments.items,
  }), shallowEqual);
  
  const stateSelect = useSelector(state => ({
    sessionExists: state.session.exists,
    token: state.session.token,
    language: state.locale.lang
  }))
  
  const options = {
    comments: useMemo(() => {
      return treeToList(listToTree(select.comments), ((item, level) => ({
        level,
        id: item._id,
        text: item.text,
        author: item.author.profile.name,
        nestingLevel: level,
        date: item.dateCreate,
      })))
    }, [select.comments]),
  }
  
  const callbacks = {
    // Изменение места публикации комментария
    changeCurrentForm: useCallback(id => {
      setCurrentAnswer(id)
      setCurrentAnswerType('comment')
    }, []),
    
    //Сброс места публикации комментария на коментарий к товару
    resetCurrentForm: useCallback(() => {
      setCurrentAnswer(params.id)
      setCurrentAnswerType('article')
    }, [params.id]),
    
    // Отправка нового комментария на бекенд
    postNewComment: useCallback((text) => {
      storeRedux.dispatch(actionsComments.post(text, currentAnswer, currentAnswerType, stateSelect.token, params.id))
    }, [currentAnswer, currentAnswerType, stateSelect.token, params.id]),
    redirect: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  };
  
  const renders = {
    itemComment: useCallback((item, index) => (
      <ItemComment
        t={t}
        key={item.id + index}
        currentAnswer={currentAnswer}
        changeCurrentForm={callbacks.changeCurrentForm}
        id={item.id}
        title={item.author}
        date={item.date}
        text={item.text}
        nestingLevel={item.nestingLevel}
        postNewComment={callbacks.postNewComment}
        resetCurrentForm={callbacks.resetCurrentForm}
        redirect={callbacks.redirect}
        sessionExists={stateSelect.sessionExists}
      />
    ), [currentAnswer, callbacks.postNewComment, callbacks.resetCurrentForm, stateSelect.sessionExists, stateSelect.language]),
  }
  
  return (
    <CommentsList
      t={t}
      commentsCount={select.commentsCount}
      comments={options.comments}
      itemComment={renders.itemComment}
      currentAnswer={currentAnswer}
      resetCurrentForm={callbacks.resetCurrentForm}
      postNewComment={callbacks.postNewComment}
      redirect={callbacks.redirect}
      sessionExists={stateSelect.sessionExists}/>
  )
}

export default React.memo(Comments);
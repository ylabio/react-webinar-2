import React, {useCallback, useMemo, useState} from 'react';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import ItemComment from "../../components/item-comment";
import CommentForm from "../../components/comment-form";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import {shallowEqual, useSelector as useSelectorRedux, useStore as useStoreRedux} from "react-redux";
import useSelector from "../../hooks/use-selector";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import actionsComments from "../../store-redux/comments/actions";

function Comments() {
  const storeRedux = useStoreRedux();
  
  const navigate = useNavigate()
  
  const location = useLocation();
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
    token: state.session.token
  }))
  
  const options = {
    comments: useMemo(() => {
      return treeToList(listToTree(select.comments)).map((item) => ({
        id: item._id,
        text: item.text,
        author: item.author.profile.name,
        nestingLevel: item.parent._tree?.length ?? 1,
        date: item.dateCreate,
      }))
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
    postNewComment: useCallback(async (text) => {
      await storeRedux.dispatch(actionsComments.post(text, currentAnswer, currentAnswerType, stateSelect.token))
      await storeRedux.dispatch(actionsComments.load(params.id));
    }, [currentAnswer, currentAnswerType, stateSelect.token, params.id]),
    redirect: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  };
  
  const renders = {
    itemComment: useCallback((item, index) => (
      <ItemComment
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
    ), [currentAnswer, callbacks.postNewComment, callbacks.resetCurrentForm, stateSelect.sessionExists]),
  }
  
  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии ({select.commentsCount})</div>
      <div className={cn('list')}>
        {options.comments.map((item, index) =>
          renders.itemComment(item, index)
        )}
      </div>
      {/* Отображение формы для добавления комментария отображается по умолчанию, и, если выбрано комментирование товара(а не другого комментария) */}
      {currentAnswer === params.id &&
        <CommentForm
          currentAnswer={currentAnswer}
          resetCurrentForm={callbacks.resetCurrentForm}
          postNewComment={callbacks.postNewComment}
          redirect={callbacks.redirect}
          sessionExists={stateSelect.sessionExists}
        />}
    </div>
  )
}

export default React.memo(Comments);
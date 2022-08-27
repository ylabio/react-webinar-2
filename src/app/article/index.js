import React, {useCallback} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useStore from "../../hooks/use-store";
import {useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import ArticleCard from "../../components/article-card";
import Spinner from "../../components/spinner";
import Layout from "../../components/layout";
import TopContainer from "../../containers/top";
import HeadContainer from "../../containers/head";
import ToolsContainer from "../../containers/tools";
import actionsArticle from '../../store-redux/article/actions';
import Comments from "../../components/comments";
import useSelector from "../../hooks/use-selector";

function Article(){
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();

  useInit(async () => {
    //await store.get('article').load(params.id);
    storeRedux.dispatch(actionsArticle.load(params.id));
  }, [params.id]);

    useInit(async () => {
        storeRedux.dispatch(actionsArticle.loadComments(params.id));
    }, [params.id]);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.article.comments
  }), shallowEqual);

    const selectIsAuth = useSelector(state => ({
        exists: state.session.exists,
    }));

const commentsArray = select.comments.comments;

    // console.log(commentsArray)
    //
    // const addPrefixChild = (comments) => {
    //     const childes = comments.filter(item => item.parent._id);
    //     return childes.reduce((comments, child) => {
    //         return [
    //             ...comments,
    //             {text: '--' + child.text},
    //         ]
    //     }, [])
    // }
    //
    // addPrefixChild(commentsArray)


    // const CATEGORY_PREFIX = '-';
    // const appendChildComments = (comments, rootComment, categoryPrefix = CATEGORY_PREFIX) => {
    //     const childes = comments?.filter(item => item.parent._id === rootComment._id); //ok
    //     console.log(childes)
    //     if (childes.length === 0) {
    //         return [];
    //     }
    //
    //     return childes.reduce((comments, child) => {
    //         return [
    //             ...comments,
    //             {value: child._id, text: categoryPrefix + ' ' + child.text},
    //             ...appendChildComments(comments, child, categoryPrefix + CATEGORY_PREFIX),
    //         ]
    //     }, [])
    // }
    //
    // const createOptionsComments = (comments) => {
    //     console.log('тест ' + comments)
    //     const optionsComment = comments?.filter(item => !item.parent)
    //     return optionsComment?.reduce((comments, rootComment) => {
    //         return [
    //             ...comments,
    //             {value: rootComment._id, text: rootComment.text},
    //             ...appendChildComments(comments, rootComment),
    //         ]
    //     }, []);
    // }
    // //
    // console.log(createOptionsComments(commentsArray))


  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    openCommentForm: useCallback((evt) => {
        evt.preventDefault();
        const authMessages = document.querySelectorAll('.auth-message');
        console.log(authMessages)
        const itemsForms = document.querySelectorAll('.Comments-item-form');
        const mainCommentsForm = document.querySelector('.Comments-form');
        const parentActiveForm = evt.target.parentNode;
        const activeForm = parentActiveForm.querySelector('.Comments-item-form');
        const activeMessage = evt.target.parentNode.querySelector('.auth-message');
        if (!selectIsAuth.exists) {
            for (let i = 0; authMessages.length > i; i++) {
                if (!authMessages[i].classList.contains('visually-hidden')) {
                    authMessages[i].classList.add('visually-hidden');
                }
                if (!itemsForms[i].classList.contains('visually-hidden')) {
                    itemsForms[i].classList.add('visually-hidden');
                }
                activeMessage.classList.remove('visually-hidden')
                console.log(activeMessage)
            }
        }
        if (selectIsAuth.exists) {
            if (!mainCommentsForm.classList.contains('visually-hidden')) {
                mainCommentsForm.classList.add('visually-hidden');
            }
            for (let i = 0; itemsForms.length > i; i++) {
                if (!itemsForms[i].classList.contains('visually-hidden')) {
                    itemsForms[i].classList.add('visually-hidden');
                }
                activeForm.classList.remove('visually-hidden');
            }
        }

    }, [selectIsAuth.exists]),
    closeCommentForm: useCallback((evt)=> {
        const mainCommentsForm = document.querySelector('.Comments-form');
        evt.target.parentNode.parentNode.classList.add('visually-hidden');
        mainCommentsForm.classList.remove('visually-hidden');
    }, []),
    resetMessage: useCallback((evt) => {
          evt.target.parentNode.classList.add('visually-hidden');
      }, [])
  };

  return (
    <Layout>
      <TopContainer/>
      <HeadContainer title={select.article.title || ''}/>
      <ToolsContainer/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      <Comments
          comments={commentsArray}
          isAuthorized={selectIsAuth.exists}
          openCommentForm={callbacks.openCommentForm}
          closeCommentForm={callbacks.closeCommentForm}
          resetMessage={callbacks.resetMessage}
      />
    </Layout>
  )
}

export default React.memo(Article);

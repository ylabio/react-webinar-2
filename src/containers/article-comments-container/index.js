import React, {useCallback, useState} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import ArticleComments from "../../components/article-comments";
import NotAuth from "../../components/article-comments/notAuth";
import Send from "../../components/article-comments/send";
import Title from "../../components/article-comments/title";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import actionsArticle from '../../store-redux/article/actions';

function ArticleCommentsContainer({ articleId, type }) {

  const storeRedux = useStoreRedux();

  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslate();

  const selectRedux = useSelectorRedux(state => ({
    comments: state.article.comments,
    waiting: state.article.waiting,
  }), shallowEqual);

  const select = useSelector(state => ({
    exists: state.session.exists
  }))

  const [text, setText] = useState('Новый комментарий 5');

  const callbacks = {
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
    sendComment: useCallback(() => storeRedux.dispatch(actionsArticle.addComment(articleId, type, text)), [articleId, text, type]),
    changeText: useCallback((e) => setText(e.currentTarget.value), [])
  };

  // console.log("type: ", type);
  // console.log("comments: ", selectRedux.comments);
  // console.log("listToTree: ", createTree(selectRedux.comments));
  // console.log("createCategoryList: ", createCategoryList(createTree(selectRedux.comments)));

  return (
    <div>
      <Title count={selectRedux.comments.length}/>

      <ArticleComments comments={createCategoryList(createTree(selectRedux.comments))}/>

      {select.exists
        ? <Send action={callbacks.sendComment}
                value={text}
                onChange={callbacks.changeText}/>
        : <NotAuth action={callbacks.onSignIn}/>
      }
    </div>
  );
}

export default React.memo(ArticleCommentsContainer);

export const createTree = (items) => {
  let tree = [];
  for (let i = 0; i < items.length; i++) {
    items[i].level = 0;
    const getLevel = (item) => {
      if (item?.parent?._id) {
        const parent = items.find((parent) => item.parent._id === parent._id);

        if (parent) {
          if (parent.children?.length) {
            !parent.children.includes(item) && parent.children.push(item);
          } else parent.children = [item];
          items[i].level++;
          getLevel(parent);
        } else return;
      } else return;
    };
    getLevel(items[i]);
    if (items[i].level === 0) tree.push(items[i]);
    else continue;
  }
  return tree
}

export const createCategoryList = (items) => {
  let arr = []

  const recursion = (items) => {
    items.forEach((item) => {
      const category = {...item};
      arr.push(category);
      if (item?.children?.length) {
        recursion(item.children);
      } else return;
    });
  };
  recursion(items);

  return arr;

}

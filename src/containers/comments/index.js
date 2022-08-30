import React, {useState, useMemo, useCallback, useRef} from "react";
import {Link} from "react-router-dom";
import propTypes from "prop-types";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import actionsComments from "../../store-redux/comments/actions";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import CommentsList from "../../components/comments-list";
import CommentsListFooter from "../../components/comments-list-footer";
import CommentContainer from "../comment";
import insertToTree from "../../utils/insertToTree";

function CommentsContainer(props) {
  // Состояние отображения формы добавления комментария
  const [listFooter, setListFooter] = useState(true);
  // Состояние отображения формы добавления ответа, в качестве значения
  // устанавливается id комментария или пустая строка
  const [itemFooter, setItemFooter] = useState('');
  // ref для хранения отображаемого массива
  const ref = useRef([]);
  const storeRedux = useStoreRedux();

  const selectStore = useSelector(state => ({
    exists: state.session.exists
  }));

  const selectRedux = useSelectorRedux(state => ({
    items: state.comments.items,
    waiting: state.comments.waiting,
    error: state.comments.error
  }), shallowEqual);

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(props.id));
  }, [props.id]);

  const callbacks = {
    postComment: useCallback(text => storeRedux.dispatch(actionsComments.post({
      text,
      parent: {
        _id: props.id,
        _type: "article"
      }
    })), [])
  };

  const renders = {
    link: useCallback(() => <Link to="/login">Войдите</Link>, []),
    comment: useCallback((comment, itemFooter) => ( 
      <CommentContainer 
        comment={comment} 
        itemFooter={itemFooter} 
        setListFooter={setListFooter} 
        setItemFooter={setItemFooter}
      />
    ), []) 
  };

  // Небольшая оптимизация рендера элементов при добавлении нового,
  // чтобы избежать ререндера всего списка
  const options = {
    comments: useMemo(() => {
      if (!selectRedux.items.length) 
        return []
      // Если первая загрузка комментариев, то используем уже готовые функции для построения иерархического списка
      else if (!ref.current.length) {
        ref.current = [
          ...treeToList(listToTree([{_id: props.id}, ...selectRedux.items])[0].children, (item, level) => ({level: level, ...item}))
        ];
        return ref.current;
      } else {
        // Вставляем новый комментарий или ответ в иерархический список
        insertToTree(ref.current, selectRedux.items.at(-1));
        return ref.current;
      }
    }, [selectRedux.items]),
  };

  if (selectRedux.error) {
    alert(selectRedux.error);
    storeRedux.dispatch(actionsComments.clearError());
  }

  return (
    <CommentsList comments={options.comments} renderComment={renders.comment} itemFooter={itemFooter}>
      <CommentsListFooter 
        session={selectStore.exists} 
        renderLink={renders.link} 
        postComment={callbacks.postComment}
        show={listFooter}
      />
    </CommentsList>
  );
}

CommentsContainer.propTypes = {
  id: propTypes.string.isRequired,
}

export default React.memo(CommentsContainer);
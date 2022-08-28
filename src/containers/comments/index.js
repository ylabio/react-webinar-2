import React, {useCallback, useMemo, useState} from "react";
import useSelector from "../../hooks/use-selector";
import NewComment from "../../components/comments/new-comment";
import ItemComment from "../../components/comments/item-comment";
import Spinner from "../../components/common/spinner";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree"
import useTranslate from "../../hooks/use-translate";
import LayoutComments from "../../components/layouts/layout-comments";
import actionsComments from '../../store-redux/comments/actions';
import useInit from "../../hooks/use-init";
import {useNavigate} from "react-router-dom";
import {dateFormat} from "../../utils/date-format";

function Comments({articleId}) {

  const {t} = useTranslate();
  const storeRedux = useStoreRedux();
  const navigate = useNavigate();

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(articleId))
  }, [articleId]);

  // id товара или того комментария, на который в данный момент можно ответить
  const [parent, setParent] = useState(articleId);

  const reduxSelect = useSelectorRedux(state => ({
    comments: state.comments.items,
    count: state.comments.count,
    waiting: state.comments.waiting
  }), shallowEqual);


  const select = useSelector(state => ({
    exists: state.session.exists,
    user: state.session.user
  }));

  const callbacks = {
    // Отправить комментарий
    sendComment: useCallback(async (text, parentId, parentType) => {
      await storeRedux.dispatch(actionsComments.send(text, parentId, parentType));
    }, [reduxSelect.count, reduxSelect.comments]),
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  }

  const options = {
    //Иерархия комментариев
    comments: useMemo(() => treeToList(listToTree(reduxSelect.comments)), [reduxSelect.comments])
  }

  const commentsList = options.comments && options.comments.map((item) => {
    return <ItemComment author={{name: item?.author?.profile?.name, _id: item?.author?._id}}
                        myself={select.user._id && item?.author?._id === select.user._id}
                        key={item._id}
                        t={t}
                        date={dateFormat(item.dateCreate)}
                        text={item.text}
                        nestingLevel={item.parent._tree?.length - 1}
                        setReply={() => setParent(item._id)}
                        replyForm={parent === item._id && <NewComment signIn={callbacks.onSignIn}
                                                                      isAuth={select.exists}
                                                                      t={t}
                                                                      isNewComment={false}
                                                                      sendComment={callbacks.sendComment}
                                                                      parentId={item._id}
                                                                      cancelReply={() => setParent(articleId)}/>
                        }/>
  })

  return (
    <Spinner active={reduxSelect.waiting}>
      <LayoutComments head={<div>{t('comments.title')} ({reduxSelect.count})</div>}>
        {commentsList}
        {parent === articleId && <NewComment signIn={callbacks.onSignIn}
                                             isAuth={select.exists}
                                             t={t}
                                             isNewComment={true}
                                             sendComment={callbacks.sendComment}
                                             parentId={articleId}
        />}
      </LayoutComments>
    </Spinner>
  );
}

export default React.memo(Comments);

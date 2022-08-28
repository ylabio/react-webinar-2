import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual } from "react-redux";
import useSelector from "../../hooks/use-selector";
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import Spinner from '../../components/spinner';
import CommentsCard from '../../components/comments-card';
import actionsComments from '../../store-redux/comments/actions';
import { useNavigate } from 'react-router-dom';

function Comments() {
  const storeRedux = useStoreRedux();
  const navigate = useNavigate();

  const [visibleTextArea, setVisibleTextArea] = useState('')

  const select = useSelectorRedux(state => ({
    comments: state.comments,
    article: state.article.data
  }), shallowEqual);

  const selectStore = useSelector(state => ({
    session: state.session,
    name: state.session.user.profile
  }))

  const commentsItem = useMemo(() => {
    return treeToList(listToTree(select.comments.items),
      (item, level) => ({
        id: item._id,
        name: item.author.profile?.name ? item.author.profile.name : selectStore.session.user.profile.name,
        dateCreate: item.dateCreate,
        text: item.text,
        level: level
      })
    )
  }, [select.comments.items])

  useEffect(() => {
    setVisibleTextArea(select.article._id)
  }, [select.article._id])

  const callbacks = {
    newComment: useCallback((text) => {
      storeRedux.dispatch(actionsComments.post(text, select.article._id, 'article'));
    }, [select.article._id]),
    answerComment: useCallback((text, parentId, type) => {
      storeRedux.dispatch(actionsComments.post(text, parentId, type));
    }, [select.article._id]),
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [])
  }

  return (
    <Spinner active={select.comments.waiting}>
      <CommentsCard
        setVisibleTextArea={setVisibleTextArea}
        items={commentsItem}
        visibleTextArea={visibleTextArea}
        count={select.comments.count}
        idArticle={select.article._id}
        exists={selectStore.session.exists}
        newComment={callbacks.newComment}
        answerComment={callbacks.answerComment}
        onSignIn={callbacks.onSignIn}
      />
    </Spinner>
  )
}

export default React.memo(Comments)
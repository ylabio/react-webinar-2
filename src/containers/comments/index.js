import React, { useCallback, useEffect, useState } from 'react';
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from 'react-redux';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useLocation, useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import ArticleCard from '../../components/article-card';
import Spinner from '../../components/spinner';
import Layout from '../../components/layout';
import TopContainer from '../../containers/top';
import HeadContainer from '../../containers/head';
import ToolsContainer from '../../containers/tools';
import actionsArticle from '../../store-redux/article/actions';
import actionsComments from '../../store-redux/comments/actions';
import CommentsWrapper from '../../components/comments-wrapper';
import CommentsList from '../../components/comments-list';
import CommentForm from '../../components/comment-form';
import CommentRedirect from '../../components/comment-redirect';

function CommentsContainer() {
  // Параметры из пути /articles/:id
  const location = useLocation();

  const storeRedux = useStoreRedux();

  const selectStore = useSelector((state) => ({
    profile: state.session.user,
    lang: state.locale.lang,
  }));

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data,
      count: state.comments.count,
      users: state.comments.users,
      showForm: state.comments.showForm,
    }),
    shallowEqual
  );

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину

    setFormToShow: useCallback((_id) =>
      storeRedux.dispatch({ type: 'comments/set-show-form', payload: { showForm: _id } })
    ),

    createComment: useCallback((comment) =>
      storeRedux.dispatch(actionsComments.create(comment, select.article._id))
    ),
  };

  return (
    <CommentsWrapper count={select.count} t={t}>
      {select.comments.length && (
        <CommentsList
          comments={select.comments}
          lang={selectStore.lang}
          t={t}
          users={select.users}
          profile={selectStore.profile}
          location={location.pathname}
          showForm={select.showForm}
          setShowForm={callbacks.setFormToShow}
          onSubmit={callbacks.createComment}
        />
      )}

      {select.showForm === select.article._id &&
        (selectStore.profile?._id ? (
          <CommentForm
            articleId={select.article._id}
            t={t}
            profile={selectStore.profile}
            onSubmit={callbacks.createComment}
            parent={select.article}
          />
        ) : (
          <CommentRedirect t={t} location={location} />
        ))}
    </CommentsWrapper>
  );
}

export default React.memo(CommentsContainer);

import React from 'react';
import {shallowEqual, useSelector as useSelectorRedux} from 'react-redux';
import Layout from '../../components/layout';
import Comments from '../../containers/article/comments';
import ArticleDescription from '../../containers/article/desc';
import HeadContainer from '../../containers/head';
import ToolsContainer from '../../containers/tools';
import TopContainer from '../../containers/top';

function Article() {
  const select = useSelectorRedux(
    state => ({
      article: {
        data: state.article.data
      }
    }),
    shallowEqual
  );

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={select.article.data.title || ''} />
      <ToolsContainer />
      <ArticleDescription />
      <Comments />
    </Layout>
  );
}

export default React.memo(Article);

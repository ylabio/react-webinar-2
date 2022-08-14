import React from 'react';
import Layout from '../../components/layout';

function PageNotFound() {
  return (
    <Layout
      children={
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>
          Страница не найдена
        </h1>
      }
    ></Layout>
  );
}

export default PageNotFound;

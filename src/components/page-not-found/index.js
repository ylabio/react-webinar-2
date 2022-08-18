import React from 'react';
import Layout from '../../components/layout';
import './style.css';

function PageNotFound() {
  return (
    <Layout
      children={
        <h1 className='PageNotFound'>
          Страница не найдена
        </h1>
      }
    ></Layout>
  );
}

export default PageNotFound;

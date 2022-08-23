import React from 'react';
import {Puff} from 'react-loader-spinner';
import Layout from '../layout';
import './style.css';

function Loading() {
  return (
    <Layout>
      <div className="Loading">
        <Puff
          height="200"
          width="200"
          radius={1}
          color="#535353"
          ariaLabel="puff-loading"
          visible={true}
        />
      </div>
    </Layout>
  );
}

export default React.memo(Loading);

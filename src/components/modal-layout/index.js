import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import Layout from '../layout';

function ModalLayout({head, children, closeHandler}){
  const cn = bem('Modal');

  return (
    <div className={cn('container')}>
      <div className={cn()}>
        <Layout head={head} headControls={<button onClick={closeHandler} className={cn('control')}>Закрыть</button>}>
          {children}
        </Layout>
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  closeHandler: propTypes.func
}

Layout.defaultProps = {
}

export default React.memo(ModalLayout);

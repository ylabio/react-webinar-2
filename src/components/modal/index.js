import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import List from "../list";
import Layout from "../layout";
import {getAllCartItemsCost} from "../../utils";

function Modal({title, isModalActive, toggleCart, children}) {
  const cn = bem('Modal');
  const a = bem('active');

  return (
    <div className={isModalActive ? cn(null, [a()]) : cn()} onClick={toggleCart}>
      <div className={isModalActive ? cn('content', [a()]) : cn('content')} onClick={e => e.stopPropagation()}>
        <Layout head={
          <>
            <h1>{title}</h1>
            <button onClick={toggleCart}>Закрыть</button>
          </>
        }>
          {children}
        </Layout>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: propTypes.string,
  isModalActive: propTypes.bool,
  toggleCart: propTypes.func.isRequired,
  children: propTypes.node
}

Modal.defaultProps = {
  title: 'Модальное окно',
  isModalActive: false,
  toggleCart: () => {},
  children: ''
}

export default React.memo(Modal);
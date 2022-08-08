import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';
import Header from '../../components/header'


function Modal(props) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('window')}>
        <Header>
          {props.head}
          <button className={cn('button')} onClick={props.onChangeModal}>Закрыть</button>
        </Header>
        <div className={cn('content')}>           
          {props.children}
        </div>      
      </div>
    </div>
  )
}

export default React.memo(Modal);

Modal.propTypes = {
  head: propTypes.node.isRequired,
  onChangeModal: propTypes.func.isRequired,
  children: propTypes.node,
}

Modal.defaultProps = {
}

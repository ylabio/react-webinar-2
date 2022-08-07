import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CustomButton from "../castom-button";

function Modal(props) {
  const cn = bem('Modal');

  const callbacks = {
    onCloseModal: useCallback(() => {
      props.onCloseModal()
    }, [props.onCloseModal])
  };

  return (
      <div className={cn()} onClick={callbacks.onCloseModal}>
        <div className={cn('content')} onClick={e => e.stopPropagation()}>
          <div className={cn('header')}>
            <h1 className={cn('title')}>{props.title}</h1>
            <div className={cn('button')}>
              <CustomButton action={callbacks.onCloseModal}
                            valueButton={'Закрыть'}/>
            </div>
          </div>
          <div className={cn('body')}>{props.children}</div>
        </div>
      </div>)
}


Modal.propTypes = {
  title: propTypes.string.isRequired,
  onCloseModal: propTypes.func.isRequired,
  children: propTypes.node
}

Modal.defaultProps = {
  onCloseModal: () => {
  }
}

export default React.memo(Modal);

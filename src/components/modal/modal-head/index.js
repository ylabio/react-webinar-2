import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css'

function ModalHead(props) {

  const cn = bem('Modal-head');

  const callbacks = {

    onChangeActive: React.useCallback(() => {
      props.headBtnAction(false);
    }, [props.headBtnAction])

  };

  return (
          <div className={cn('content')}>
            {props.headText}
            <button className={cn('btn')} onClick={callbacks.onChangeActive}> {props.headBtnName} </button>
          </div>
  );

};

ModalHead.propTypes = {
  headText: propTypes.string,
  headBtnName: propTypes.string,
  headBtnAction: propTypes.func
}

ModalHead.defaultProps = {
  headText: 'Пример названия',
  headBtnName: 'Кнопка',
  headBtnAction: () => {}
}

export default React.memo(ModalHead)


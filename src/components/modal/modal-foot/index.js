import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';


function ModalFoot(props) {

  const cn = bem('Modal-foot');

  return (
        (props.totalItems !== 0) && <div className={cn('content')}>
          <div className={cn('text')}> {props.text} </div>
          <div className={cn('total')}> {props.totalSum} ₽ </div>
        </div>
  );

};

ModalFoot.propTypes = {
  totalItems: propTypes.number,
  totalSum: propTypes.string,
  text: propTypes.string
}

ModalFoot.defaultProps = {
  text: 'Пример текста',
  totalSum: '0',
  totalItems: 0
}

export default React.memo(ModalFoot)

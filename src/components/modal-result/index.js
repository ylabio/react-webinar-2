import React from "react";
import propTypes from 'prop-types';
import './style.css'
import {cn as bem} from "@bem-react/classname";

function ModalResult({result}){
  const cn = bem('ModalResult');

  return (
    <div className={cn()}>        
      <div className={cn('total')}>Итого</div> 
        <div className={cn('result')}>{`${Intl.NumberFormat('ru-RU').format(result)} ₽`}</div>      
    </div>
  )
}

ModalResult.propTypes = {
  result: propTypes.number 
}

ModalResult.defaultProps = {
  totalSum: 0
}

export default React.memo(ModalResult);
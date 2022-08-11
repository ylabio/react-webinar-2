import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Controls from '../../controls';

function HeaderModal({onModal}) {
  
  return (
    <div className='Header-modal Layout-head'>
      <h2>Корзина</h2>
      <Controls onModal={onModal} textButton={'Закрыть'} />
    </div>
  )
}

HeaderModal.propTypes = {
  onModal: propTypes.func
}

HeaderModal.defaultProps = {
  onModal: () => {}
}

export default React.memo(HeaderModal);

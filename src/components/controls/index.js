import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";


function Controls(props){
  const cn = bem('Controls');
  const {orderResult, setModalActive} = props;

  return (
    <div>
      <div className='Controls'>
      <div>В корзине: </div>
        <div className={cn('table')}>
          {orderResult}
      </div>
        <button onClick={() => setModalActive(true)}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  orderResult: propTypes.string.isRequired,
  setModalActive: propTypes.func
}

Controls.defaultProps = {
  orderResult: 'пусто',
  onAddItem: () => {}
}

export default React.memo(Controls);
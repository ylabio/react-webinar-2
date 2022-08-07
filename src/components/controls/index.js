import React, {useState} from 'react';
import propTypes from 'prop-types';
import './style.css';
import ModalBasket from '../modalBasket/modalBasket';

function Controls({onAdd}){
  
  const [modalActive, setModalActive] = useState(false);
  return (
    <div>
      <div className='Controls'>
        <button onClick={() => setModalActive(true)}>Перейти</button>
      </div>
      <ModalBasket active={modalActive} setActive={setModalActive}>
        lorem
      </ModalBasket>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);

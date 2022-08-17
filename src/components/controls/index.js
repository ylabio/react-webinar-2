import propTypes from 'prop-types';
import React from 'react';
import useLanguage from '../../utils/use-language';
import './style.css';

function Controls({onAdd}){

  const lng = useLanguage();

  return (
    <div className='Controls'>
      <button onClick={onAdd}>{lng("buttonAdd")}</button>
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

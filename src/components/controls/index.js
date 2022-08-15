import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import locText from "../../utils/localization";
import useSelector from "../../utils/use-selector";
import './style.css';

function Controls({onAdd}){

  const language = useSelector(state => state.localization.lang);
  useEffect(() => {}, [language]);

  return (
    <div className='Controls'>
      <button onClick={onAdd}>{locText("buttonAdd")}</button>
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

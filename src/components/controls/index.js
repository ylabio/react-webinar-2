import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { dictionaryEnum } from '../../enums/dictionaryEnum';
import useSelector from '../../utils/use-selector';

function Controls({onAdd}){
  const select = useSelector(state => ({
	  lang: state.common.language
  }));

  return (
    <div className='Controls'>
      <button onClick={onAdd}>{dictionaryEnum.add[select.lang]}</button>
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

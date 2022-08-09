import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({setActive}){
  return (
    <div className='Controls'>
      <button onClick={()=>setActive(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes={
  setActive: propTypes.func.isRequired,
}
Controls.defaultProps={
  setActive: ()=>{}
}
export default React.memo(Controls);

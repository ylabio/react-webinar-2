import React from 'react';
import './style.css';

function Loader(){
  return (
    <div className='Loader'>
      Идет загрузка...
    </div>
  )
}

Loader.propTypes = {
}

Loader.defaultProps = {
}

export default React.memo(Loader);

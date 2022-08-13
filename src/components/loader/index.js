import React from 'react'; 
import './style.css';

function Loader() {
    return (
    <div className='LayoutLoader'>
    <div className='loader'></div>    
    </div>
  );
}

export default React.memo(Loader);

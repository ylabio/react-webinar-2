import React from "react";
import "./style.css";

function LoadingScreen(){
    return(
         <div className='loading'>
          <p className='loading-text'>Loading ...</p>
        </div>
    )
}

export default React.memo(LoadingScreen)
import React from "react";
import {Link} from 'react-router-dom'

function HomeMenuButton() {
    return(
      <Link to={'/'}>
        <span>Главная</span>
      </Link>
    )
}

export default React.memo(HomeMenuButton);
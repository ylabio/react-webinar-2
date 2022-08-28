import React from "react";
import './style.css'

function UnauthComment({onSignIn}){
    return(
        <div className="Container">
            <div className="Content"><div onClick={onSignIn} to='/login' className="Container-auth">Войдите</div><div>, чтобы иметь возможность комментировать</div></div>
        </div>
    )
}

export default React.memo(UnauthComment)
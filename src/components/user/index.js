import React from "react";
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import "./styles.css"

const User = (props) => {

    let cn = bem("User")
    return (
        <div className={cn()}>
            <div className={cn("header")}>Профиль</div>
            <div className={cn("text")}>
                Имя: <span>{props.user.profile ? props.user.profile.name : ""}</span>
            </div>
            <div className={cn("text")}>
                Телефон: <span>+70000000001</span>
            </div>
            <div className={cn("text")}>
                email: <span>test_50@example.com</span>
            </div>
        </div>
    )
}

User.prototype = {
    user: propTypes.object
}

export default React.memo(User)
import React from "react";
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import "./styles.css"

const Profile = (props) => {

    let cn = bem("Profile")
    return (
        <div className={cn()}>
            <div className={cn("header")}>Профиль</div>
            <div className={cn("text")}>
                Имя: <span>{props.profile ? props.profile.name : ""}</span>
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

Profile.prototype = {
    profile: propTypes.object
}

export default React.memo(Profile)
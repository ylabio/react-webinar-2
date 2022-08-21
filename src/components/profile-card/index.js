import React from "react";
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import "./style.css";

function ProfileCard({profile}){
    const cn = bem('ProfileCard')

    return(
        <div className={cn()}>
            <h2 className={cn('title')}>Профиль</h2>
            <p>Имя: <span className={cn('cell')}>{profile.name}</span></p>
            <p>Телефон: <span className={cn('cell')}>{profile.phone}</span></p>
            <p>email: <span className={cn('cell')}>{profile.email}</span></p>
        </div>
    )

}

ProfileCard.propTypes = {
    profile: propTypes.object.isRequired
}

export default React.memo(ProfileCard)
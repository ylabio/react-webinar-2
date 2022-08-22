import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

const ProfileContent = ({name, phone, email}) => {
    const cn = bem('Profile');
    return (
        <div className={cn()}>
            <h2>
                Профиль
            </h2>

            <p className={cn('row')}>
                Имя:  <b>{name}</b>
            </p>
            <p className={cn('row')}>
                Телефон:  <b>{phone}</b>
            </p>
            <p className={cn('row')}>
                email:  <b>{email}</b>
            </p>
        </div>
    );
};

ProfileContent.defaultProps = {
    name: propTypes.string.isRequired,
    phone: propTypes.string.isRequired,
    email: propTypes.string.isRequired
}

export default ProfileContent;
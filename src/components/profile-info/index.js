import React from 'react';
import propTypes from "prop-types";
import { cn as bem } from '@bem-react/classname'
import './style.css';

function ProfileInfo(props) {
    const cn = bem('ProfileInfo');

    return (
        <div className={cn()}>
            <h2 className={cn('title')}>{props.data.title}</h2>
            <div className={cn('line')}>{props.data.name} <span className={cn('bold')}>{props.name}</span></div>
            <div className={cn('line')}>{props.data.phone} <span className={cn('bold')}>{props.phone}</span></div>
            <div className={cn('line')}>{props.data.email} <span className={cn('bold')}>{props.email}</span></div>
        </div>
    )
}

ProfileInfo.propTypes = {
    data: propTypes.object.isRequired,
    name: propTypes.string,
    phone: propTypes.string,
    email: propTypes.string,
}

ProfileInfo.defaultProps = {
    name: '',
    phone: '',
    email: '',
}

export default React.memo(ProfileInfo);
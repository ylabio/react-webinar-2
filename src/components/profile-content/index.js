import React from 'react';
import {cn as bem} from '@bem-react/classname'
import 'style.css'

const ProfileContent = ({user, t}) => {
    const cn = bem('ProfileContent');
    return (
        <div className={cn()}>
            <div className={cn('title')}>{t('profile.title')}</div>
            <div className={cn('prop')}>
                <div className={cn('label')}>{t('profile.name')}:</div>
                <div className={cn('value')}>{user.profile?.name}</div>
            </div>
            <div className={cn('prop')}>
                <div className={cn('label')}>{t('profile.phone')}:</div>
                <div className={cn('value')}>{user.profile?.phone}</div>
            </div>
            <div className={cn('prop')}>
                <div className={cn('label')}>e mail:</div>
                <div className={cn('value')}>{user.email}</div>
            </div>
        </div>
    );
};

export default ProfileContent;
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfilePage({t, user}) {
  const cn = bem('ProfilePage');
  const navigate = useNavigate();

  {
    if (user.profile) {
      return (
        <div className={cn()}>
          <h2>{t('profile')}</h2>
          <div className={cn('user-data')}>
            <div className={cn('cell')}>Имя:&nbsp;
              <span className={cn('bold')}>{user ? user.profile?.name : null}</span>
            </div>
            <div className={cn('cell')}>Телефон:&nbsp;
              <span className={cn('bold')}>{user ? user.profile?.phone : null}</span></div>
            <div className={cn('cell')}>email:&nbsp;
              <span className={cn('bold')}>{user ? user?.email : null}</span></div>
          </div>
        </div>
      )
    } else {
      useEffect(() => {
        navigate('/')
      }, [user])
    }
  }
}

ProfilePage.propTypes = {
  t: propTypes.func.isRequired,
  user: propTypes.object
}

ProfilePage.defaultProps = {
}

export default React.memo(ProfilePage);

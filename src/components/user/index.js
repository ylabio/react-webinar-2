import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function User({ t, name, phone, email }) {

  const cn = bem('User');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('user.title')}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('user.name')}:</div>
        <div className={cn('value')}>{name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('user.phone')}:</div>
        <div className={cn('value')}>{phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('user.email')}:</div>
        <div className={cn('value')}>{email}</div>
      </div>

    </div>
  )
}

User.propTypes = {
  article: propTypes.object.isRequired,
  onAdd: propTypes.func
}

User.defaultProps = {
  article: {},
  onAdd: () => {}
}

export default React.memo(User);

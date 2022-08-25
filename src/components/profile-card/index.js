import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard({data}) {

  // CSS классы по БЭМ
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>Профиль</h3>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>{data?.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{data?.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{data?.email}</div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  data: propTypes.object.isRequired,
  onAdd: propTypes.func
}

ProfileCard.defaultProps = {
  data: {},
  onAdd: () => {}
}

export default React.memo(ProfileCard);

import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import LayoutFlex from '../../layouts/layout-flex';
import './style.css';
function ProfileContent({text, profile}) {
  const cn = bem('Profile');
  return (
    <LayoutFlex direction={'column'} align={'start'} flex={'with-gap'}>
      <h2 className={cn('head')}>{text.head}</h2>
      <div className={cn('item')}>
        <span>{text.name}: </span>
        <strong>{profile.name}</strong>
      </div>
      <div className={cn('item')}>
        <span>{text.phone}: </span>
        <strong>{profile.phone}</strong>
      </div>
      <div className={cn('item')}>
        <span>{text.email}: </span>
        <strong>{profile.email}</strong>
      </div>
    </LayoutFlex>
  );
}

ProfileContent.propTypes = {
  text: propTypes.objectOf(propTypes.string).isRequired,
  profile: propTypes.objectOf(propTypes.string).isRequired
};

export default React.memo(ProfileContent);

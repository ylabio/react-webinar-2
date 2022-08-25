import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function ProfileInfo(props) {
	const cn = bem('ProfileInfo');
	
	return (
		<div className={cn()}>
			<div className={cn('prop')}>
        <div className={cn('label')}>Имя: </div>
        <div className={cn('value')}>{props.user.name}</div>
      </div>
			<div className={cn('prop')}>
        <div className={cn('label')}>Телефон: </div>
        <div className={cn('value')}>{props.user.phone}</div>
      </div>
			<div className={cn('prop')}>
        <div className={cn('label')}>email: </div>
        <div className={cn('value')}>{props.user.email}</div>
      </div>
		</div>
	)
}

ProfileInfo.propTypes = {
  user: propTypes.object.isRequired,
}

ProfileInfo.defaultProps = {
}

export default React.memo(ProfileInfo);
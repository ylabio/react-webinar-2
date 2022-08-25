import React from 'react'
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function ProfilePage(props) {
  const cn = bem("ProfilePage")
  return (
    <div className={cn()}>
      <h2>{props.title}</h2>
      <div className={cn('label')}>{props.nameTitle}: <strong>{props.name}</strong></div>
      <div className={cn('label')}>{props.phoneTitle}: <strong>{props.phone}</strong></div>
      <div className={cn('label')}>{props.emailTitle}: <strong>{props.email}</strong></div>
    </div>
  )
}
ProfilePage.propTypes = {
  title: propTypes.string,
  nameTitle: propTypes.string,
  phoneTitle: propTypes.string,
  name: propTypes.string,
  phone: propTypes.string,
  email: propTypes.string,
  emailTitle: propTypes.string
}
ProfilePage.defaultProps = {

}
export default React.memo(ProfilePage)
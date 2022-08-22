import React from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './styles.css'

function ProfileInfo({ user }) {
  const cn = bem('ProfileInfo')

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <div>имя: {user.name}</div>
      <div>телефон: {user.phone}</div>
      <div>e-mail: {user.email}</div>
    </div>
  )
}

ProfileInfo.propTypes = {
  user: propTypes.object.isRequired,
}

ProfileInfo.defaultProps = {}

export default React.memo(ProfileInfo)

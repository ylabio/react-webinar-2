import React from 'react'


export const ProfileInfo = ({ profile, title = 'Профиль' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '50px 0px 0px 20px' }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <div>Имя: <b>{profile.profile?.name}</b></div>
      <div>Телефон: <b>{profile.profile?.phone}</b></div>
      <div>Email: <b>{profile?.email}</b></div>

    </div>
  )
}

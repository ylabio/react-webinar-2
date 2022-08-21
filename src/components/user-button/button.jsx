import React from 'react'
import { Link } from 'react-router-dom';

export const Button = ({ auth, profile, onClick, loginPath, profilePath }) => {

  return (
    <div>
      {
        auth
          ?
          <div>
            <Link style={{ color: '#0087E9' }} to={profilePath}>{profile?.name}</Link>
            <button style={{ margin: '0px 23px 0px 23px', color: '#000', textDecoration: 'none' }}>
              <Link style={{ color: '#000', textDecoration: 'none' }} onClick={onClick} to={loginPath}>Выход
              </Link>
            </button>
          </div>
          :
          <button style={{ margin: '0px 23px 0px 23px', color: '#000', textDecoration: 'none' }}>
            <Link style={{ color: '#000', textDecoration: 'none' }} to={loginPath}>Вход
            </Link>
          </button>
      }
    </div>
  )
}

import React from 'react'
import './styles.css'

function LoginError({code, t}) {
  return (
    <div className='LoginError'>
      {t(`login.error.${code}`)}
    </div>
  )
}

export default LoginError
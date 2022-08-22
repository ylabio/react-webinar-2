import React from 'react'
import propTypes from 'prop-types'
import './style.css'

function LoginError({code, t}) {
  return (
    <div className='LoginError'>
      {t(`login.error.${code}`)}
    </div>
  )
}

LoginError.propTypes = {
  code: propTypes.string,
  t: propTypes.func
}

LoginError.defaultProps = {
  
}

export default React.memo(LoginError);
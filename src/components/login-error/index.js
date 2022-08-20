import React from 'react'
import propTypes from 'prop-types'
import './styles.css'

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
  code: '',
  t: (v) => v
}

export default React.memo(LoginError)
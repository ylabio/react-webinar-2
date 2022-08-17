import { cn } from '@bem-react/classname'
import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import { routes } from '../../utils/routes'
import propTypes from 'prop-types'

function Navbar({translate: {toMain}}) {
  const bem = cn('Navbar')

  return (
  <div className={bem()}>
    <Link to={routes.home()}>{toMain}</Link>
  </div>  
  )
}

Navbar.propTypes = {
  translate: propTypes.object
}
Navbar.defaultProps = {
  translate: {
    toMain: 'toMain'
  }
}

export default React.memo(Navbar)
import React from 'react'
import './style.css';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NoAcces({ path,children}) {
  return (
    <div className='NoAcces'>
      <p className='NoAcces-title'>
        <Link to={path}>Войдите</Link>, чтобы иметь возможность ответить. {children}
      </p>

    </div>
  )
}
NoAcces.propTypes = {
  path: propTypes.string.isRequired,
  closeNoAcces: propTypes.func,
  children:propTypes.node
}
NoAcces.defaultProps = {
  closeNoAcces: () => { }
}
export default NoAcces
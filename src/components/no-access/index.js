import React from 'react'
import './style.css';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NoAcces({ path, setFormModal }) {
  return (
    <div className='NoAcces'>
      <p className='NoAcces-title'>
        <Link to={path}>Войдите</Link>, чтобы иметь возможность ответить. <span onClick={()=>setFormModal(false)}>Отмена</span>
      </p>

    </div>
  )
}
NoAcces.propTypes = {
  path: propTypes.string.isRequired,
  setFormModal: propTypes.func
}
NoAcces.defaulProps = {
  setFormModal: () => { }
}
export default NoAcces
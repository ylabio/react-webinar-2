import React from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types';
function LinkMenu({ path, title, setTitle, localStorageKey, localStorageValue, idItem, children, cuurentItemDefaultValue }) {
  return (
    <Link to={`${path}${idItem}`}
      onClick={() => {
        setTitle(title);
        localStorageKey ? localStorage.setItem(`${localStorageKey}`, localStorageValue) : null
        cuurentItemDefaultValue()
      }}
    >{children}</Link>
  )
}
LinkMenu.propTypes = {
  path: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  localStorageKey: propTypes.string,
  localStorageValue: propTypes.string,
  idItem: propTypes.string,
  cuurentItemDefaultValue: propTypes.func
}
LinkMenu.defaultProps = {
  path: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  idItem: '',
  localStorageKey: '',
  localStorageValue: '',
  cuurentItemDefaultValue: () => { }
}
export default LinkMenu
